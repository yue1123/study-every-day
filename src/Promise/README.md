# Promise 八股文

## 导语

业务开发中经常用 Promise，但是第一题真不一定能作对……
业务开发中经常用 Promise，但是第一题真不一定能作对……emmm，我说的是别犹豫的、能非常肯定的给出答案的哪种...

作为前端开发，相信日常开发中 Promise 的使用率应该时最高的，另外面试中 js 基础部分考察最多的也莫过于 Promise，所以 Promise 的重要性咱就不多说了。

说的那么重要，是不是有点夸张了，想想不就几个 api 吗？但是真的了解他的运行机制吗？现在不管是大厂还是小厂，Promise 已经成为了面试必考知识点；可是真正掌握了多少，真正面试的时候，又能有多少把握呢？

平时大家忙于业务开发，很多基础知识时间一长就容易淡忘，所以本文根据 Promise 的一些知识点总结了 19 道题，看看你能做对几道，希望对你有点帮助。

## 主要考察点

- 执行顺序
- 值透传
- 错误处理
- 返回值
- 链式调用
- 最终考察的还是我们对 Promise 的理解程度。

## 目标

通关标准，能够给出答案，并且给出合理的解释。【为什么给出这个答案？】

## 牢记
**不是Promise是异步的,而是Promise.then方法的执行是异步的**


## async / await 
> [https://segmentfault.com/a/1190000011296839](https://segmentfault.com/a/1190000011296839)
> 
> [https://segmentfault.com/a/1190000007535316](https://segmentfault.com/a/1190000007535316)
## 01

难易程度：⭐⭐⭐

```js
Promise.resolve(1)
	.then((res) => {
		console.log(res)
		return 2
	})
	.catch((err) => {
		return 3
	})
	.then((res) => {
		console.log(res)
	})
// 1 2
```

## 02

难易程度：⭐

```js
const promise = new Promise((resolve, reject) => {
	console.log(1)
	resolve()
	console.log(2)
})
promise.then(() => {
	console.log(3)
})
console.log(4)
// 1 2 4 3
```

## 03

难易程度：⭐⭐⭐

```js
const promise1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('success')
	}, 1000)
})
const promise2 = promise1.then(() => {
	throw new Error('error!!!')
})

console.log('promise1', promise1)
console.log('promise2', promise2)

setTimeout(() => {
	console.log('promise1', promise1)
	console.log('promise2', promise2)
}, 2000)

// promise1 Promise { <pending> }
// promise2 Promise { <pending> }
// new Error('error!!!')  // 抛出错误,后续代码不会执行
```

## 04

难易程度：⭐⭐

```js
setTimeout(() => console.log(5), 0)
new Promise((resolve) => {
	console.log(1)
	resolve(3)
	Promise.resolve().then(() => console.log(4))
}).then((num) => {
	console.log(num)
})
console.log(2)
// 1 2 4 3 5
```

## 05

难易程度：⭐⭐

```js
const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('once')
		resolve('success')
	}, 1000)
})

const start = Date.now()
promise.then((res) => {
	console.log(res, Date.now() - start)
})
promise.then((res) => {
	console.log(res, Date.now() - start)
})
// once
// success 1000+
// success 1000+
```

## 06

难易程度：⭐⭐⭐

```js
Promise.resolve()
	.then(() => {
		return new Error('error!!!')
	})
	.then((res) => {
		console.log('then: ', res)
	})
	.catch((err) => {
		console.log('catch: ', err)
	})
// then:  Error: error!!!
```

## 07

难易程度：⭐⭐⭐⭐

```js
const promise = Promise.resolve().then(() => {
	return promise
})
promise.catch(console.error)
// [TypeError: Chaining cycle detected for promise #<Promise>]
```

## 08

难易程度：⭐⭐⭐

```js
Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log)
```

09
难易程度：⭐⭐⭐

```js
Promise.resolve()
	.then(
		function success(res) {
			throw new Error('error')
		},
		function fail1(e) {
			console.error('fail1: ', e)
		}
	)
	.catch(function fail2(e) {
		console.error('fail2: ', e)
	})
// fail2:  Error: error
```

变种后

```js
Promise.resolve()
	.then(
		function success1(res) {
			throw new Error('error')
		},
		function fail1(e) {
			console.error('fail1: ', e)
		}
	)
	.then(
		function success2(res) {},
		function fail2(e) {
			console.error('fail2: ', e)
		}
	)
// fail2:  Error: error
```

## 10

难易程度：⭐⭐⭐⭐

```js
process.nextTick(() => {
	console.log('nextTick')
})
Promise.resolve().then(() => {
	console.log('then')
})

// 宏任务
setImmediate(() => {
	console.log('setImmediate')
})
console.log('end')

// end
// nextTick
// then
// setImmediate
```

## 11

难易程度：⭐⭐⭐⭐

```js
const first = () =>
	new Promise((resolve, reject) => {
		console.log(3)
		let p = new Promise((resolve, reject) => {
			console.log(7)
			setTimeout(() => {
				console.log(5)
				resolve(6)
			}, 0)
			resolve(1)
		})
		resolve(2)
		p.then((arg) => {
			console.log(arg)
		})
	})

first().then((arg) => {
	console.log(arg)
})
console.log(4)
// 3 7 4 1 2 5
```

## 12

难易程度：⭐⭐

```js
var p = new Promise((resolve, reject) => {
	reject(Error('The Fails!'))
})
p.catch((error) => console.log(error.message))
p.catch((error) => console.log(error.message))
// The Fails!
// The Fails!
```

## 13

难易程度：⭐⭐⭐

> 不理解为什么报错

```js
var p = new Promise((resolve, reject) => {
	return Promise.reject(Error('The Fails!'))
})
p.catch((error) => console.log(error.message, '1111')).catch((error) => console.log(error.message, '123123'))
p.catch((error) => console.log(error.message, '1111')).catch((error) => console.log(error.message, '123123'))
// 报错
```

## 14

难易程度：⭐⭐

```js
var p = new Promise((resolve, reject) => {
	reject(Error('The Fails!'))
})
	.catch((error) => console.log('error:', error))
	.then((error) => console.log(error))
// error: Error: The Fails!
```

## 15

难易程度：⭐⭐

```js
new Promise((resolve, reject) => {
	resolve('Success!')
})
	.then(() => {
		throw Error('Oh noes!')
	})
	.catch((error) => {
		return 'actually, that worked'
	})
	.catch((error) => console.log(error.message))
// 没有任何输出, 第一个then抛出一个错误,会被第一个catch捕获,但是他return了一个字符串,属于是resolve的返回值,所以第二个catch不会执行
```

## 16

难易程度：⭐⭐

```js
Promise.resolve('Success!')
	.then((data) => {
		return data.toUpperCase()
	})
	.then((data) => {
		console.log(data)
		return data
	})
	.then(console.log)
// SUCCESS!
// SUCCESS!
```

## 17

难易程度：⭐⭐

```js
Promise.resolve('Success!')
	.then(() => {
		throw Error('Oh noes!')
	})
	.catch((error) => {
		return 'actually, that worked'
	})
	.then((data) => {
		throw Error('The fails!')
	})
	.catch((error) => console.log(error.message))
// The fails!
```

## 18

难易程度：⭐⭐⭐⭐

```js
const first = () =>
	new Promise((resolve, reject) => {
		console.log(3)
		let p = new Promise((resolve, reject) => {
			console.log(7)
			setTimeout(() => {
				console.log(5)
				resolve(6)
			}, 0)
			resolve(1)
		})
		resolve(2)
		p.then((arg) => {
			console.log(arg)
		})
	})

first().then((arg) => {
	console.log(arg)
})
console.log(4)
// 3 7 4 1 2 5
```

## 19

难易程度：⭐⭐⭐⭐⭐

```js
async function async1() {
	console.log(1)
	const result = await async2()
	console.log(3)
}

async function async2() {
	console.log(2)
}

Promise.resolve().then(() => {
	console.log(4)
})

setTimeout(() => {
	console.log(5)
})

async1()
console.log(6)
// 1 2 6 4 3 5
```
