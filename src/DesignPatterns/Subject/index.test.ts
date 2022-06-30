import { Subject, Observer } from './index'

describe('测试观察者模式实现', () => {
	it('添加观察者,并更新state', (done) => {
		const subject = new Subject()
		const observer = new Observer((message) => {
			console.log(message)
			done()
		})

		subject.attach(observer)
		subject.changeState()
	})

	it('添加观察者然后取消观察,并更新state', (done) => {
		const subject = new Subject()
		const observer = new Observer((message) => {
			console.log(message)
			done(new Error('不应该调用此方法'))
		})

		subject.attach(observer)
		subject.detach(observer)
		subject.changeState()
		done()
	})

	it('添加观察者,并异步更新state', (done) => {
		const subject = new Subject()
		const observer = new Observer((message) => {
			console.log(message)
			done()
		})

		subject.attach(observer)
		setTimeout(() => {
			subject.changeState()
		}, 2000)
	})
})
