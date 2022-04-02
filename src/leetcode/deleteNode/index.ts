/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
class ListNode {
	val: any
	next: ListNode | null
	constructor(val: any) {
		this.val = val
		this.next = null
	}
	setNext(node: ListNode) {
		this.next = node
		return node
	}
}

var deleteNode = function (node: ListNode) {
	node.val = node.next?.val
	//然后删除下一个结点
	node.next = node.next?.next || null
}


const testNode = new ListNode(5)
const startNode = new ListNode(4)

startNode.setNext(testNode).setNext(new ListNode(1)).setNext(new ListNode(9))
console.log(startNode);
deleteNode(testNode)
console.log(startNode)
