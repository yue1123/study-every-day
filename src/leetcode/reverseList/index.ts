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
 * @return {ListNode}
 */
var reverseList = function (head: ListNode) {
	let stack = []
	let currentNode: ListNode | null = head
	while (currentNode) {
		stack.push(currentNode)
		currentNode = currentNode.next!
	}
	if (stack.length === 0) {
		return null
	}
	if (stack.length === 1) {
		return head
	}
	for (let i = stack.length - 1; i >= 0; i--) {
		const currentNode = stack[i]
		const nextNode = stack[i - 1] || null
		if (nextNode) nextNode.next = null
		currentNode.next = nextNode
	}
	return stack.pop()
}

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

const linkedList = generateListNodeByArr([1, 2, 3, 4, 5])!

// console.log(reverseList(linkedList))
console.log(JSON.stringify(reverse(linkedList)))
