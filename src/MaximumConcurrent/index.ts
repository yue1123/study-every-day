export type AsyncTask<T = any> = () => Promise<T>
export type SyncTask = (...arg: any[]) => any
export type Task = AsyncTask | SyncTask
export type Dispatch = (...task: Task[]) => void

export function createTaskDispatch(max = 5): Dispatch {
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
		const _task = task.map((taskItem) => {
			if (!isPromise(task)) {
				return () =>
					new Promise<any>((resolve) => {
						taskItem()
						resolve(null)
					})
			}
			return taskItem
		})

		Array.prototype.push.apply(untouchedTasks, _task)
		drainUntouchedTasks()
	}
}

function debounce(fn: (...arg: any[]) => any, delay = 16) {
	let timer: NodeJS.Timeout | null = null
	return (...arg: any[]) => {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(null, arg)
		}, delay)
	}
}

export function isDef(v: any): boolean {
	return v !== undefined && v !== null
}
// 判断一个值是否是 promise
function isPromise(val: any): boolean {
	return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function'
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
dispatch(
	promise(1),
	function () {
		console.log(123)
	},
	() => {
		console.log(123456)
	},
	promise(3),
	promise(4)
)
