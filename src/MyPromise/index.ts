enum Status {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected'
}

import {Resolve, Reject, Executor, onFulfilled, onRejected} from './my-promise'

function isPromise(value: any): value is PromiseLike<any> {
    return (
        ((typeof value === 'object' && value !== null) ||
            typeof value === 'function') &&
        typeof value.then === 'function'
    )
}


class MyPromise<T> {
    // 开始状态的值
    status: Status = Status.PENDING
    // 当前Promise的终值,他一定有值
    private value!: T
    // 当前Promise的拒因,可能没有值
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
    _resolve(value: T) {
        // 如果value传入的是一个 thenable 对象
        if(isPromise(value)){

        }
        if (this.status === Status.PENDING) {
            this.status = Status.FULFILLED
            this.value = value
            for (let onResolvedCallback of this.onResolvedCallbacks) {
                onResolvedCallback()
            }
        }
    }

    // 供Promise内部调用的reject方法
    private _reject(reason: any) {
        if (this.status === Status.PENDING) {
            this.reason = reason
            this.status = Status.REJECTED
            for (let onRejectedCallback of this.onRejectedCallbacks) {
                onRejectedCallback()
            }
        }
    }

    public then<TResult1 = T, TResult2 = any>(
        onFulfilled?: onFulfilled<T, TResult1>,
        onRejected?: onRejected<TResult2>
    ): MyPromise<TResult1 | TResult2> {
        // 如果Promise状态是完成态,直接调用
        if (this.status === Status.FULFILLED) {
            // setTimeout 模拟异步微任务,实际上setTimeout是宏任务
            setTimeout(() => {
                onFulfilled!(this.value)
            })
        }
        // 如果Promise状态是失败,直接调用
        if (this.status === Status.REJECTED) {
            // setTimeout 模拟异步微任务,实际上setTimeout是宏任务
            setTimeout(() => {
                onRejected!(this.reason)
            })

        }
        // 如果Promise状态是pending,将成功和失败回调保存起来
        if (this.status === Status.PENDING) {
            this.onResolvedCallbacks.push(() => {
                onFulfilled!(this.value)
            })
            this.onRejectedCallbacks.push(() => {
                onRejected!(this.reason)
            })
        }
        return new MyPromise(() => {
        })
    }
}

export default MyPromise
