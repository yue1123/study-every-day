"use strict";
exports.__esModule = true;
var Status;
(function (Status) {
    Status["PENDING"] = "pending";
    Status["FULFILLED"] = "fulfilled";
    Status["REJECTED"] = "rejected";
})(Status || (Status = {}));
// 判断是不是thenable对象
function isPromise(value) {
    // 如果时不为null的对象或者function(函数也可以手动为其添加then方法)
    return (((typeof value === 'object' && value !== null) ||
        typeof value === 'function') &&
        typeof value.then === 'function');
}
/**
 * then的链式调用处理函数,负责处理当前then方法返回值,传递给下一个then方法
 *
 */
function resolvePromise(promise2, x, resolve, reject) {
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
        var e = new TypeError('TypeError: Chaining cycle detected for promise #<MyPromise>');
        // 清空栈信息，防止出现多余的堆栈信息
        e.stack = '';
        // 直接进入错误的回调
        return reject(e);
    }
    // 防止多次调用
    var called = false;
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
            var then = x.then;
            if (typeof then === 'function') {
                then.call(x, function (y) {
                    if (called)
                        return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, function (e) {
                    if (called)
                        return;
                    called = true;
                    reject(e);
                });
            }
            else {
                // 如果 then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
                resolve(x);
            }
        }
        catch (e) {
            if (called)
                return;
            called = true;
            reject(e);
        }
    }
    else {
        // 非thenable之外的普通值处理
        resolve(x);
    }
}
var MyPromise = /** @class */ (function () {
    function MyPromise(executor) {
        // 开始状态的值
        this.status = Status.PENDING;
        // 当前Promise成功的回调收集
        this.onResolvedCallbacks = [];
        // 当前Promise失败的回调收集
        this.onRejectedCallbacks = [];
        try {
            // 防止 this 丢失
            executor(this._resolve.bind(this), this._reject.bind(this));
        }
        catch (error) {
            // 出错直接 reject
            this._reject(error);
        }
    }
    // TIPS: 不是promise是异步,而是promise的then方法是异步
    // 供Promise内部调用的resolve方法
    MyPromise.prototype._resolve = function (value) {
        var _this = this;
        try {
            setTimeout(function () {
                if (_this.status === Status.PENDING) {
                    _this.status = Status.FULFILLED;
                    _this.value = value;
                    for (var _i = 0, _a = _this.onResolvedCallbacks; _i < _a.length; _i++) {
                        var onResolvedCallback = _a[_i];
                        onResolvedCallback();
                    }
                }
            });
        }
        catch (e) {
            this._reject(e);
        }
    };
    // 供Promise内部调用的reject方法
    MyPromise.prototype._reject = function (reason) {
        var _this = this;
        try {
            setTimeout(function () {
                if (_this.status === Status.PENDING) {
                    _this.reason = reason;
                    _this.status = Status.REJECTED;
                    for (var _i = 0, _a = _this.onRejectedCallbacks; _i < _a.length; _i++) {
                        var onRejectedCallback = _a[_i];
                        onRejectedCallback();
                    }
                }
            });
        }
        catch (e) {
            this._reject(e);
        }
    };
    MyPromise.prototype.then = function (onFulfilled, onRejected) {
        var _this = this;
        /**
         * 处理onFulfilled或onRejected方法没有传或者不是函数的时候,进行值穿透
         * 原理很简单,没有传,就定义一个方法,默认返回上一个then方法的返回值
         */
        var onFulfilledFn = typeof onFulfilled === 'function' ? onFulfilled : function (v) { return v; };
        var onRejectedFn = typeof onRejected === 'function' ? onRejected : function (e) {
            throw e;
        };
        var promise2 = new MyPromise(function (resolve, reject) {
            // 如果Promise状态是完成态,直接调用
            if (_this.status === Status.FULFILLED) {
                setTimeout(function () {
                    // setTimeout 模拟异步微任务,实际上setTimeout是宏任务
                    try {
                        var x = onFulfilledFn(_this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            }
            // 如果Promise状态是失败,直接调用
            if (_this.status === Status.REJECTED) {
                // setTimeout 模拟异步微任务,实际上setTimeout是宏任务
                setTimeout(function () {
                    try {
                        var x = onRejectedFn(_this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            }
            // 如果Promise状态是pending,将成功和失败回调保存起来
            if (_this.status === Status.PENDING) {
                _this.onResolvedCallbacks.push(function () {
                    try {
                        var x = onFulfilledFn(_this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
                _this.onRejectedCallbacks.push(function () {
                    try {
                        var x = onRejectedFn(_this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            }
            console.log('this.onResolvedCallbacks', _this.onResolvedCallbacks);
            console.log('this.onRejectedCallbacks', _this.onRejectedCallbacks);
        });
        return promise2;
    };
    // promise.catch 方法
    MyPromise.prototype["catch"] = function (onRejected) {
        return this.then(null, onRejected);
    };
    // promise.resolve 方法
    MyPromise.resolve = function (value) {
        // 如果是 Promise，直接返回当前 Promise
        if (value instanceof MyPromise) {
            return value;
        }
        return new MyPromise(function (resolve) {
            resolve(value);
        });
    };
    // promise.reject 方法
    MyPromise.reject = function (reason) {
        return new MyPromise(function (_, reject) {
            reject(reason);
        });
    };
    MyPromise.all = function (values) {
        return new MyPromise(function (resolve, reject) {
            // PromiseLike<T> 对象会跟踪转换为 T
            var resultArr = [];
            //  判断是否已经全部完成了
            var doneArr = [];
            // 获取迭代器对象
            var iter = values[Symbol.iterator]();
            // 获取值 {value:xxx, done: false}
            var cur = iter.next();
            // 判断迭代器是否迭代完毕同时将最后得到的值放入结果数组中
            var resolveResult = function (value, index, done) {
                resultArr[index] = value;
                doneArr[index] = true;
                if (done && doneArr.every(function (item) { return item; })) {
                    resolve(resultArr);
                }
            };
            var _loop_1 = function (i) {
                var value = cur.value;
                doneArr.push(false);
                cur = iter.next();
                if (isPromise(value)) {
                    value.then(function (value) {
                        resolveResult(value, i, cur.done);
                    }, reject);
                }
                else {
                    resolveResult(value, i, cur.done);
                }
            };
            for (var i = 0; !cur.done; i++) {
                _loop_1(i);
            }
        });
    };
    MyPromise.race = function (values) {
        return new MyPromise(function (resolve, reject) {
            var iter = values[Symbol.iterator]();
            var cur = iter.next();
            while (!cur.done) {
                var value = cur.value;
                cur = iter.next();
                if (isPromise(value)) {
                    value.then(resolve, reject);
                }
                else {
                    resolve(value);
                }
            }
        });
    };
    // promise.finally 方法,无论promise成功或是失败,都会调用
    MyPromise.prototype["finally"] = function (onFinally) {
        return this.then(function (value) {
            MyPromise.resolve(
            // 如果 onFinally 返回的是一个 thenable 也会等返回的 thenable 状态改变才会进行后续的 Promise
            typeof onFinally === 'function' ? onFinally() : onFinally).then(function () { return value; });
        }, function (reason) {
            MyPromise.resolve(typeof onFinally === 'function' ? onFinally() : onFinally).then(function () {
                throw reason;
            });
        });
    };
    return MyPromise;
}());
exports["default"] = MyPromise;
