/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
import { ListNode } from '../../DataStructuresAlgorithms/LinkedList'
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head: ListNode) {
	let slow: ListNode | null = head
	let fast: ListNode | null = head
	while (fast !== null && fast.next !== null && fast.next!.next !== null) {
		slow = slow.next!
		fast = fast.next!.next!
		if (slow === fast) {
			return true
		}
	}
	return false
}

const cycleNode = new ListNode(2)
const linkedList = new ListNode(3)
	.setNext(cycleNode)
	.setNext(new ListNode(0))
	.setNext(new ListNode(-4))
	.setNext(cycleNode)

console.log(hasCycle(linkedList))
