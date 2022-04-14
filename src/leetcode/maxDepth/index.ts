import { Tree } from 'istanbul-lib-report'
import { TreeNode, generateTreeNodeByArray } from '../../DataStructuresAlgorithms/TreeNode'
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root: TreeNode | null): number {
	return root === null
		? 0
		: Math.max(maxDepth(root.left || null), maxDepth(root.right || null)) + 1
}

let treeNode = generateTreeNodeByArray([
	3,
	9,
	20,
	null,
	null,
	15,
	7,
	11,
	12,
	13,
	14,
	15,
	16,
	17,
	18
])
console.log(maxDepth(treeNode))
