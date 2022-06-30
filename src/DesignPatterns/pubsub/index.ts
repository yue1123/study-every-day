export class PubSub {
	private subCenter: Record<string, ((...messages: any[]) => void)[]> = {}
	constructor() {
		this.subCenter = Object.create(null)
	}
	// 添加消息订阅
	on(eventKey: string, cal: (...messages: any[]) => void): this {
		if (!this.subCenter[eventKey]) {
			this.subCenter[eventKey] = []
		}
		this.subCenter[eventKey].push(cal)
		return this
	}
	// 发布消息指定事件消息
	emit(eventKey: string, ...messages: any[]): this {
		const subs = this.subCenter[eventKey]
		if (subs) {
			subs.forEach((sub) => {
				sub.apply(null, messages)
			})
		}
		return this
	}
	// 取消订阅消息
	off(eventKey: string, cal?: (...messages: any[]) => void): this {
		const subs = this.subCenter[eventKey]
		if (subs) {
			if (!cal) {
				this.subCenter[eventKey] = []
			} else {
				for (let i = subs.length; i >= 0; i--) {
					if (subs[i] === cal) {
						subs.splice(i, 1)
					}
				}
			}
		}
		return this
	}
}
