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
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root: TreeNode | null): boolean {
	if (root === null) return true
	if (Math.abs(helper(root.left) - helper(root.right)) > 1) return false
	return isBalanced(root.left) && isBalanced(root.right)
}

const helper = (node: TreeNode | null): number => {
	return node === null ? 0 : Math.max(helper(node.left || null), helper(node.right || null)) + 1
}
