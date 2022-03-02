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

// new MyPromise<void>((resolve) => {
//     resolve()
//     console.log(123123)
// })
//     .then(() => {
//         return 'step1'
//     })
//     .then((res) => {
//         return new Promise((resolve) => {
//             resolve(res + ':' + 'step2')
//         })
//     })
//     .then((res) => {
//         console.log(res) // step1:step2
//     })


// new MyPromise((resolve) => {
//     console.log('resolve之前')
//     resolve(1)
//     console.log('resolve之后')
// }).then(res => {
//     console.log('result', res)
// })
// console.log('--------------------')
// new Promise((resolve) => {
//     console.log('resolve之前')
//     resolve(1)
//     console.log('resolve之后')
// }).then(res => {
//     console.log('result', res)
// })
// console.log('--------------------')

let d1 = Date.now()
// setTimeout(() => {
//     console.log(Date.now() - d1, '---1---')
// }, 0)
// MyPromise.all([new MyPromise((resolve) => {
//     setTimeout(() => {
//         console.log(Date.now() - d1, '---1---')
//         resolve(1)
//     }, 1000)
// }), ]).then(res => {
//     console.log(res)
// })

new MyPromise((resolve) => {
    setTimeout(() => {
        console.log(Date.now() - d1, '---2---')
        resolve(2)
    }, 1000)
}).then(res => {
    console.log('then', res)
}).finally<number>(() => {
    console.log('finally')
    return Promise.resolve(1)
}).then(res => {
    console.log('finally then', res)
})