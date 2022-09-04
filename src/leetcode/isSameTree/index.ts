import { generateTreeNodeByArray, TreeNode } from '../../DataStructuresAlgorithms/TreeNode'

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p: any, q: any) {
	let stack1: any = []
	let stack2: any = []
	while (p || stack1.length || q || stack2.length) {
		while (p !== null && q !== null) {
			stack1.push(p)
			stack2.push(q)
			p = p.left
			q = q.left
		}
		if (q === null && p === null) {
			p = stack1.pop()
			q = stack2.pop()
			if (p.val != q.val) {
				return false
			}
			p = p.right
			q = q.right
		} else {
			return false
		}
	}
	return true
}

let treeNode1 = generateTreeNodeByArray([5, 4, 1, null, 1, null, 4, 2, null, 2])
let treeNode2 = generateTreeNodeByArray([5, 1, 4, 4, null, 1, null, null, 2, null, 2])

//   1
// 1

//     1
// null  1

console.log(isSameTree(treeNode1, treeNode2))
