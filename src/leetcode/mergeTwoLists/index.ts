import { generateListNodeByArr, ListNode } from '../../DataStructuresAlgorithms/LinkedList'
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (
	list1: ListNode | null | undefined,
	list2: ListNode | null | undefined
) {
	if (!list1) return list2
	if (!list2) return list1
	let temp = new ListNode(0)
	let curr = temp
	while (list1 && list2) {
		if (list1.val >= list2.val) {
			curr.next = list2
			list2 = list2.next
		} else {
			curr.next = list1
			list1 = list1.next
		}
		curr = curr.next
	}
	curr.next = !!list1 ? list1 : list2
	return temp.next
}

const list1 = generateListNodeByArr([1, 2, 4])
const list2 = generateListNodeByArr([1, 3, 4])
console.log(JSON.stringify(mergeTwoLists(list1, list2)))
