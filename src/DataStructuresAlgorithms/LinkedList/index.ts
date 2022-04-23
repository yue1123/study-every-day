export class ListNode {
	val: any
	next: ListNode | null | undefined
	constructor(val: any) {
		this.val = val
		this.next = null
	}
	setNext(node: ListNode) {
		this.next = node
		return node
	}
}

export function generateListNodeByArr(arr: any[]) {
	let linkedList = null
	let preListNode = null
	for (let i = 0, len = arr.length; i < len; i++) {
		const currentNode = new ListNode(arr[i])
		if (!linkedList) {
			linkedList = currentNode
		} else {
			preListNode!.setNext(currentNode)
		}
		preListNode = currentNode
	}
	return linkedList
}

export function getLinkedListLength(linkedList: ListNode) {
	let len = 0
	let currentNode: ListNode | null = linkedList
	while (currentNode) {
		len++
		currentNode = currentNode.next!
	}
	return len
}
