import { generateListNodeByArr, ListNode } from '../../DataStructuresAlgorithms/LinkedList'
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head: ListNode | null) {
	if (!head) return head
	if (head.next) {
		deleteDuplicates(head.next)
		if (head.val === head.next.val) {
			head.next = head.next.next
		}
	}
	return head
}

const linkedList = generateListNodeByArr([1, 1, 2, 3, 3])

console.log(deleteDuplicates(linkedList))
