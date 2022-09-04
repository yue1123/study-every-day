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
 * @return {number}
 */
var minDepth = function (root: TreeNode | null): number {
	if (root === null) return 0
	if (root.left === null && root.right !== null) {
		return 1 + minDepth(root.right)
	}
	if (root.right === null && root.left !== null) {
		return 1 + minDepth(root.left)
	}
	return 1 + Math.min(minDepth(root.left), minDepth(root.right))
}
