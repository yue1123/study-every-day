export type Task<T = any> = () => Promise<T>
type Dispatch = (...task: Task[]) => void
function createTaskDispatch(max = 5): Dispatch {
	const untouchedTasks: Task[] = []

	const drainUntouchedTasks = debounce(() => {
		while (max > 0 && untouchedTasks.length) {
			max--
			const task = untouchedTasks.shift()!
			task().finally(() => {
				max++
				drainUntouchedTasks()
			})
		}
	})
	return function dispatch<T extends Promise<T>>(...task: Task[]): void {
		Array.prototype.push.apply(untouchedTasks, task)
		drainUntouchedTasks()
	}
}

const dispatch = createTaskDispatch(2)

const promise = (id: number) => {
	return () => {
		return new Promise<number>((resolve) => {
			setTimeout(() => {
				console.log(id)
				resolve(1)
			}, 1000)
		})
	}
}

dispatch(promise(1), promise(2), promise(3), promise(4))

function debounce(fn: (...arg: any[]) => any, delay = 16) {
	let timer: NodeJS.Timeout | null = null
	return (...arg: any[]) => {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(null, arg)
		}, delay)
	}
}
