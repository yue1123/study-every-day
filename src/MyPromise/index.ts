enum Status {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected'
}

import { Executor, onFulfilled, onRejected, Reject, Resolve } from './my-promise'

// 判断是不是thenable对象
function isPromise(value: any): value is PromiseLike<any> {
    // 如果时不为null的对象或者function(函数也可以手动为其添加then方法)
    return (
        ((typeof value === 'object' && value !== null) ||
            typeof value === 'function') &&
        typeof value.then === 'function'
    )
}

/**
 * then的链式调用处理函数,负责处理当前then方法返回值,传递给下一个then方法
 *
 */
function resolvePromise<T>(
    promise2: MyPromise<T>,
    x: T | PromiseLike<T>,
    resolve: Resolve<T>,
    reject: Reject): any {
    /**
     * 判断x是否和当前promise是同一个对象,不然会造成无限循环
     * TIPS: 当判断到是一个thenable对象时,会执行thenable对象的then方法,then方法又会返回一个相同的promise,如果不做判断,就对造成无限循环
     * const promise2: any = new Promise((resolve) => {
     *    resolve()
     * }).then(res => promise2, err => {
     *    console.error(err)   // TypeError: Chaining cycle detected for promise #<Promise>
     * })
     */
    if (x === promise2) {
        const e = new TypeError('TypeError: Chaining cycle detected for promise #<MyPromise>')
        // 清空栈信息，防止出现多余的堆栈信息
        e.stack = ''
        // 直接进入错误的回调
        return reject(e)
    }
    // 防止多次调用
    let called = false
    /**
     * 递归解析的过程（因为可能 promise 中还有 promise） Promise/A+ 2.3.3.3.1
     * 如果当前then方法返回值是一个thenable对象,则按照promise的方式处理
     * 这里的理解比较抽象
     * 如果符合条件,先获取到当前promise的then方法返回的promise的then方法,然后通过调用
     *  - 第一个参数相当于promise的resolve,调用时会将promise的终值传递过来(resolve方法的实参)
     *  - 第二个参数相当于promise的reject,调用时会将promise的拒因传递过来(reject方法的实参)
     */
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            const then = (x as PromiseLike<T>).then
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y as T | PromiseLike<T>, resolve, reject)
                }, (e) => {
                    if (called) return
                    called = true
                    reject(e)
                })
            } else {
                // 如果 then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
                resolve(x as T)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        // 非thenable之外的普通值处理
        resolve(x as T)
    }
}

class MyPromise<T> {
    // 开始状态的值
    public status: Status = Status.PENDING
    // 当前Promise的终值
    private value?: T
    // 当前Promise的拒因
    private reason?: any
    // 当前Promise成功的回调收集
    private onResolvedCallbacks: (() => void)[] = []
    // 当前Promise失败的回调收集
    private onRejectedCallbacks: (() => void)[] = []

    constructor(executor: Executor<T>) {
        try {
            // 防止 this 丢失
            executor(this._resolve.bind(this), this._reject.bind(this))
        } catch (error) {
            // 出错直接 reject
            this._reject(error)
        }
    }

    // TIPS: 不是promise是异步,而是promise的then方法是异步
    // 供Promise内部调用的resolve方法
    private _resolve(value?: T) {
        try {
            setTimeout(() => {
                if (this.status === Status.PENDING) {
                    this.status = Status.FULFILLED
                    this.value = value
                    for (let onResolvedCallback of this.onResolvedCallbacks) {
                        onResolvedCallback()
                    }
                }
            })
        } catch (e) {
            this._reject(e)
        }
    }

    // 供Promise内部调用的reject方法
    private _reject(reason: any) {
        try {
            setTimeout(() => {
                if (this.status === Status.PENDING) {
                    this.reason = reason
                    this.status = Status.REJECTED
                    for (let onRejectedCallback of this.onRejectedCallbacks) {
                        onRejectedCallback()
                    }
                }
            })
        } catch (e) {
            this._reject(e)
        }
    }

    public then<TResult1 = T, TResult2 = never>(
        onFulfilled?: onFulfilled<T, TResult1>,
        onRejected?: onRejected<TResult2>
    ): MyPromise<TResult1 | TResult2> {
        /**
         * 处理onFulfilled或onRejected方法没有传或者不是函数的时候,进行值穿透
         * 原理很简单,没有传,就定义一个方法,默认返回上一个then方法的返回值
         */
        const onFulfilledFn = typeof onFulfilled === 'function' ? onFulfilled : (v?: T | TResult1) => v as TResult1
        const onRejectedFn = typeof onRejected === 'function' ? onRejected : (e: any) => {
            throw  e
        }

        const promise2 = new MyPromise<TResult1 | TResult2>((resolve, reject) => {
            // 如果Promise状态是完成态,直接调用
            if (this.status === Status.FULFILLED) {
                setTimeout(() => {
                    // setTimeout 模拟异步微任务,实际上setTimeout是宏任务
                    try {
                        const x = onFulfilledFn!(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            // 如果Promise状态是失败,直接调用
            if (this.status === Status.REJECTED) {
                // setTimeout 模拟异步微任务,实际上setTimeout是宏任务
                setTimeout(() => {
                    try {
                        const x = onRejectedFn!(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            // 如果Promise状态是pending,将成功和失败回调保存起来
            if (this.status === Status.PENDING) {
                this.onResolvedCallbacks.push(() => {
                    try {
                        const x = onFulfilledFn!(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                this.onRejectedCallbacks.push(() => {
                    try {
                        const x = onRejectedFn!(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        })
        return promise2
    }

    // promise.catch 方法
    public catch<TResult = never>(onRejected: onRejected<TResult>): MyPromise<T | TResult> {
        return this.then(null, onRejected)
    }

    // promise.resolve 方法
    public resolve<T>(value?: T): MyPromise<T> {
        // 如果是 Promise，直接返回当前 Promise
        if (value instanceof MyPromise) {
            return value
        }
        return new MyPromise((resolve) => {
            resolve(value)
        })
    }

    // promise.reject 方法
    public reject(reason?: any) {
        return new MyPromise((_, reject) => {
            reject(reason)
        })
    }

    // promise.all 方法
    public all(values: any) {
        return new MyPromise((resolve, reject) => {
            // PromiseLike<T> 对象会跟踪转换为 T
            const resultArr: T[] = []
            //  判断是否已经全部完成了
            const doneArr: boolean[] = []
            // 获取迭代器对象
            let iter = values[Symbol.iterator]()
            // 获取值 {value:xxx, done: false}
            let cur = iter.next()
            // 判断迭代器是否迭代完毕同时将最后得到的值放入结果数组中
            const resolveResult = (value: T, index: number, done?: boolean) => {
                resultArr[index] = value
                doneArr[index] = true
                if (done && doneArr.every((item) => item)) {
                    resolve(resultArr)
                }
            }
            for (let i = 0; !cur.done; i++) {
                const value = cur.value
                doneArr.push(false)
                cur = iter.next()
                if (isPromise(value)) {
                    value.then((value: T) => {
                        resolveResult(value, i, cur.done)
                    }, reject)
                } else {
                    resolveResult(value, i, cur.done)
                }
            }
        })

    }
}

export default MyPromise
