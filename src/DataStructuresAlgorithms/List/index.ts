// 构造函数
export default class List<T> {
	// 当前列表索引位置
	private pos: number = 0
	// 列表中元素的个数
	private listSize: number = 0
	// 列表数据存储仓库
	private dataStore: T[] = []

	/**
	 * length
	 * 返回列表中元素的个数
	 */
	get length() {
		return this.listSize
	}

	// 寻找一个元素所谓的位置
	private _find(element: T): number {
		const { listSize, dataStore } = this
		for (let i = 0; i < listSize; i++) {
			if (dataStore[i] === element) {
				return i
			}
		}
		return -1
	}
	/**
	 * clear
	 * 清空列表中所有元素
	 */
	public clear(): void {
		Reflect.deleteProperty(this, 'dataStore')
		this.dataStore = []
		this.listSize = this.pos = 0
	}
	/**
	 * insert
	 * 列表中插入元素
	 */
	public insert(element: T, after: T): boolean {
		const pos = this._find(after)
		if (pos > -1) {
			this.dataStore.splice(pos + 1, 0, element)
			++this.listSize
			return true
		}
		return false
	}
	/**
	 * remove
	 * 从列表中删除元素
	 * @param index 移动的位置
	 */
	public remove(element: T): boolean {
		const pos = this._find(element)
		if (pos > -1) {
			this.dataStore.splice(pos, 1)
			return true
		}
		return false
	}
	/**
	 * append
	 * 列表追加元素
	 * @param element 追加的元素
	 */
	public append(element: T): void {
		this.dataStore[this.listSize++] = element
	}
	/**
	 * next
	 * 列表当前位置右移
	 */
	public next(): void {
		if (this.pos < this.listSize) {
			++this.pos
		}
	}
	/**
	 * next
	 * 列表当前位置右移
	 */
	public prev(): void {
		if (this.pos > 0) {
			--this.pos
		}
	}
	/**
	 * front
	 * 将列表当前位置移动到第一个
	 */
	public front() {
		this.pos = 0
	}
	/**
	 * front
	 * 将列表当前位置移动到最后一个
	 */
	public end() {
		this.pos = this.listSize - 1
	}
	/**
	 * moveTo
	 * @param index 移动的位置
	 * 将列表当前位置移动到指定位置
	 */
	public moveTo(index: number) {
		this.pos = index
	}
	/**
	 * getElement
	 * 返回当前位置的元素
	 */
	public getElement(): T {
		return this.dataStore[this.pos]
	}
	/**
	 * currPos
	 * 返回当前列表位置
	 */
	public currPos(): number {
		return this.pos
	}
	/**
	 * toString
	 * 返回列表的字符串形式
	 */
	public toString(): T[] {
		return this.dataStore
	}
}
