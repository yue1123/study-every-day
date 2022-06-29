export class PubSub {
	private subCenter: Record<string, ((...messages: any[]) => void)[]> = {}
	constructor() {
		this.subCenter = Object.create(null)
	}
	// 添加消息订阅
	on(eventKey: string, cal: (...messages: any[]) => void): void {
		if (!this.subCenter[eventKey]) {
			this.subCenter[eventKey] = []
		}
		this.subCenter[eventKey].push(cal)
	}
	// 发布消息指定事件消息
	emit(eventKey: string, ...messages: any[]): void {
		const subs = this.subCenter[eventKey]
		if (subs) {
			subs.forEach((sub) => {
				sub.apply(null, messages)
			})
		}
	}
	// 取消订阅消息
	off(eventKey: string, cal: (...messages: any[]) => void) {
		const subs = this.subCenter[eventKey]
		if (subs) {
			const index = subs.findIndex((sub) => sub === cal)
			if (index > -1) {
				subs.splice(index, 1)
			}
		}
	}
}
