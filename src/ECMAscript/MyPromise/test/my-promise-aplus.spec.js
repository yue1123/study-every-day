"use strict";
// 在文件末尾加上
var index_1 = require("../index");
// 忽略 typescript 校验
// @ts-ignore
index_1["default"].defer = index_1["default"].deferred = function () {
    var dfd = {};
    dfd.promise = new index_1["default"](function (resolve, reject) {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};
module.exports = index_1["default"];
