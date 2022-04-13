import {
	ListNode,
	generateListNodeByArr,
	getLinkedListLength
} from '../../DataStructuresAlgorithms/LinkedList/index'
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head: ListNode, n: number): ListNode {
	let len = getLinkedListLength(head) - n
	let pre = head
	if (len === 0) {
		return head.next!
	}
	for (let i = 0, len1 = len - 1; i < len1; i++) {
		pre = pre.next!
	}
	pre.next = pre.next?.next
	return head
}
const linkedList = generateListNodeByArr([1, 2, 3, 4, 5])!
console.log(JSON.stringify(removeNthFromEnd(linkedList, 2)))
// startNode.setNext(testNode).setNext(new ListNode(1)).setNext(new ListNode(9))
