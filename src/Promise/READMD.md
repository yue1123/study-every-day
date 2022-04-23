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
```

## 07

难易程度：⭐⭐⭐⭐

```js
const promise = Promise.resolve().then(() => {
	return promise
})
promise.catch(console.error)
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
setImmediate(() => {
	console.log('setImmediate')
})
console.log('end')
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
```

## 12

难易程度：⭐⭐

```js
var p = new Promise((resolve, reject) => {
	reject(Error('The Fails!'))
})
p.catch((error) => console.log(error.message))
p.catch((error) => console.log(error.message))
```

## 13

难易程度：⭐⭐⭐

```js
var p = new Promise((resolve, reject) => {
	return Promise.reject(Error('The Fails!'))
})
p.catch((error) => console.log(error.message))
p.catch((error) => console.log(error.message))
```

## 14

难易程度：⭐⭐

```js
var p = new Promise((resolve, reject) => {
	reject(Error('The Fails!'))
})
	.catch((error) => console.log(error))
	.then((error) => console.log(error))
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
```
