export class Subject {
	public state: number
	private observers: Observer[]
	constructor() {
		this.state = 0
		this.observers = []
	}
	public attach(observer: Observer): void {
		const index = this.observers.findIndex((ob) => ob === observer)
		if (index === -1) {
			this.observers.push(observer)
		}
	}
	public detach(observer: Observer): void {
		const index = this.observers.findIndex((ob) => ob === observer)
		if (index !== -1) {
			this.observers.splice(index, 1)
		}
	}
	public notify(): void {
		for (const observer of this.observers) {
			observer.update(this)
		}
	}

	// 该方法仅仅用于模拟改变state
	public changeState() {
		const oldState = this.state
		this.state = Math.ceil(Math.random() * 100)
		console.log(`state发生改变, 旧的state是${oldState},新的state是${this.state}`)
    this.notify()
	}
}

export class Observer {
	public cal: (...arg: any[]) => void
	constructor(cal: (...arg: any[]) => void) {
		this.cal = cal
	}
	update(subject: Subject) {
		if (subject instanceof Subject) {
      console.log(subject)
			this.cal('收到新的state:' + subject.state)
		}
	}
}
