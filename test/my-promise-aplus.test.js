"use strict";
// 在文件末尾加上
var MyPromise_1 = require("../src/MyPromise");
// 忽略 typescript 校验
// @ts-ignore
MyPromise_1["default"].defer = MyPromise_1["default"].deferred = function () {
    var dfd = {};
    dfd.promise = new MyPromise_1["default"](function (resolve, reject) {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};
module.exports = MyPromise_1["default"];
