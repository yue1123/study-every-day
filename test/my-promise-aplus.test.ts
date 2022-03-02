// 在文件末尾加上
import MyPromise from "../src/MyPromise";
// 忽略 typescript 校验
// @ts-ignore
MyPromise.defer = MyPromise.deferred = function () {
    let dfd: any = {}
    dfd.promise = new MyPromise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

export = MyPromise