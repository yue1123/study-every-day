import MyPromise from '../src/MyPromise/index'

const promise = new MyPromise<boolean>((resolve, reject) => {
    setTimeout(() => {
        console.log('111');
        resolve(true)
    }, 2000);
})
console.log(12312);
let d1 = Date.now()
promise.then(res => {
    console.log(Date.now() - d1)
    console.log(res);
})