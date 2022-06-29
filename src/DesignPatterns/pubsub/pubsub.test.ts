import { PubSub } from './index'
describe('测试发布订阅实现', () => {
	it('同步发布订阅', (done: () => void) => {
		const pubSub = new PubSub()
		pubSub.on('click', (message) => {
			console.log('我收到了click消息', message)
			done()
		})
		pubSub.emit('click', '我是click消息')
	})

	it('异步发布订阅', (done: () => void) => {
		const pubSub = new PubSub()
		pubSub.on('click1', (message) => {
			console.log('我收到了click1消息', message)
			done()
		})
		setTimeout(() => {
			pubSub.emit('click1', '我是click1消息')
		}, 1000)
	})

	it('多个订阅', (done: () => void) => {
		const pubSub = new PubSub()
		let count = 0
		const _done = () => {
			count++
			if (count === 3) done()
		}
		pubSub.on('update', (message) => {
			console.log('我收到了update消息', message)
			_done()
		})
		pubSub.on('update', (message) => {
			console.log('我收到了update消息', message)
			_done()
		})
		pubSub.on('update', (message) => {
			console.log('我收到了update消息', message)
			_done()
		})
		setTimeout(() => {
			pubSub.emit('update', '我是update消息')
		}, 1000)
	})

	it('多个类型的订阅', (done: () => void) => {
		const pubSub = new PubSub()
		let count = 0
		const _done = () => {
			count++
			if (count === 3) done()
		}
		pubSub.on('update', (message) => {
			console.log('我收到了update消息', message)
			_done()
		})
		pubSub.on('create', (message) => {
			console.log('我收到了create消息', message)
			_done()
		})
		pubSub.on('mounted', (message) => {
			console.log('我收到了mounted消息', message)
			_done()
		})

		setTimeout(() => {
			pubSub.emit('create', '我是create消息')
		}, 1000)
		setTimeout(() => {
			pubSub.emit('mounted', '我是mounted消息')
		}, 2000)
		setTimeout(() => {
			pubSub.emit('update', '我是update消息')
		}, 3000)
	})
})
