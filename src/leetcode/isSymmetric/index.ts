import { TreeNode } from '../../DataStructuresAlgorithms/TreeNode'
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
 * @return {boolean}
 */
var isSymmetric = function (node: TreeNode | null) {
	// for (let i = 0; i < nodes.length; i++) {
	// 	const element = nodes[i]
	// }
	if (node === null) {
		return true
	}
	return isSymmetricHelper(node.left, node.right)
}

var isSymmetricHelper = function (left: TreeNode | null, right: TreeNode | null): boolean {
	// 左右子节点都为null,说明是叶子节点
	if (left === null && right === null) {
		return true
	}
  // 左右子节点是否为null,或者 left.val 不等于 right.val
	if (left === null || right === null || left.val !== right.val) {
		return false
	}
	return isSymmetricHelper(left.left, right.right) && isSymmetricHelper(left.right, right.left)
}

export default isSymmetric