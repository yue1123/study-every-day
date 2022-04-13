/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
import { generateListNodeByArr, ListNode } from '../../DataStructuresAlgorithms/LinkedList'
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindromeList = function (head: ListNode) {
	let fast: ListNode | null = head
	let slow: ListNode | null = head
	while (fast !== null && fast.next !== null) {
		fast = fast.next?.next!
		slow = slow.next!
	}
	// 如果fast 不为空,说明链表是奇数个
	if (fast !== null) {
		slow = slow.next!
	}
	slow = reverse(slow)
	fast = head
	while (slow !== null) {
		if (fast.val !== slow.val) {
			return false
		}
		fast = fast.next!
		slow = slow.next!
	}
	return true
}

// 双链表法反转链表
function reverse(head: ListNode) {
	let prev: ListNode | null = null
	while (head != null) {
		let next: ListNode | null = head.next!
		head.next = prev
		prev = head
		head = next
	}
	return prev
}

const linkedList = generateListNodeByArr([1, 2, 2, 1])!
const linkedList1 = generateListNodeByArr([1, 2])!
console.log(isPalindromeList(linkedList))
console.log(isPalindromeList(linkedList1))
