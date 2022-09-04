import { TreeNode } from '../../DataStructuresAlgorithms/TreeNode'
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/** 递归方式
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal1 = function (root: TreeNode) {
	let res: any[] = []
	// 中序遍历: 左 => 打印 => 右
	const inorder = (node: TreeNode | null) => {
		if (node === null) return null
		inorder(node.left)
		res.push(node.val)
		inorder(node.right)
	}
	inorder(root)
	return res
}

/** 迭代方式
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal2 = function (root: TreeNode | null) {
	let res: any[] = []
	let stack: any[] = []
	while (root || stack.length) {
		while (root) {
			stack.push(root)
			root = root.left
		}
		root = stack.pop()
		res.push(root!.val)
		root = root!.right
	}
	return res
}

export default { inorderTraversal1, inorderTraversal2 }
