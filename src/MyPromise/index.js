"use strict";
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
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            var then = x.then;
            if (typeof then === 'function') {
                then.call(x, function (y) {
                    if (called)
                        return;
                    called = true;
                    // FIXME: 不理解?
                    // 递归解析的过程（因为可能 promise 中还有 promise） Promise/A+ 2.3.3.3.1
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
        // 如果value传入的是一个 thenable 对象
        if (isPromise(value)) {
        }
        if (this.status === Status.PENDING) {
            this.status = Status.FULFILLED;
            this.value = value;
            for (var _i = 0, _a = this.onResolvedCallbacks; _i < _a.length; _i++) {
                var onResolvedCallback = _a[_i];
                onResolvedCallback();
            }
        }
    };
    // 供Promise内部调用的reject方法
    MyPromise.prototype._reject = function (reason) {
        if (this.status === Status.PENDING) {
            this.reason = reason;
            this.status = Status.REJECTED;
            for (var _i = 0, _a = this.onRejectedCallbacks; _i < _a.length; _i++) {
                var onRejectedCallback = _a[_i];
                onRejectedCallback();
            }
        }
    };
    MyPromise.prototype.then = function (onFulfilled, onRejected) {
        var _this = this;
        var promise2 = new MyPromise(function (resolve, reject) {
            // 如果Promise状态是完成态,直接调用
            if (_this.status === Status.FULFILLED) {
                setTimeout(function () {
                    // setTimeout 模拟异步微任务,实际上setTimeout是宏任务
                    try {
                        var x = onFulfilled(_this.value);
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
                        var x = onRejected(_this.reason);
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
                        var x = onFulfilled(_this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
                _this.onRejectedCallbacks.push(function () {
                    try {
                        var x = onRejected(_this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            }
        });
        return promise2;
    };
    return MyPromise;
}());
