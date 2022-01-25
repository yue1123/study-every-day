import MyPromise from '../src/MyPromise/index'
//
// const promise = new MyPromise<boolean>((resolve, reject) => {
//     setTimeout(() => {
//         console.log('111');
//         resolve(true)
//     }, 2000);
// })
// console.log(12312);
// let d1 = Date.now()
// promise.then(res => {
//     console.log(Date.now() - d1)
//     console.log(res);
// })

//
// const promise2: any = new Promise((resolve) => {
//     // @ts-ignore
//     resolve(1111)
// }).then()

// const promise2: Promise<any> = new Promise<void>((reslove) => {
//     reslove()
// }).then((y) => {
//     return promise2
// })

// promise2.then(() => {}, console.log)

new MyPromise<void>((resolve) => {
    resolve()
    console.log(123123)
})
    .then(() => {
        return 'step1'
    })
    .then((res) => {
        return res + ':' + 'step2'
    })
    .then((res) => {
        console.log(res) // step1:step2
    })
