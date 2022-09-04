/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

import { TreeNode } from '../../DataStructuresAlgorithms/TreeNode'

/**
 * 递归解法
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root: TreeNode) {
	let res: any[] = []
	const helper = (root: TreeNode | null) => {
		if (root === null) return null
		res.push(root.val)
		helper(root.left)
		helper(root.right)
	}
	helper(root)
	return res
}

/**
 * 迭代
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal1 = function (root: TreeNode | null) {
	let res = []
	let stack = []
	while (root || stack.length) {
		while (root) {
			res.push(root.val)
			stack.push(root)
			root = root.left
		}
    root = stack.pop()!.right
	}
  return res
}
