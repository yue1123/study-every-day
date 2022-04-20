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
 * @return {number[][]}
 */
var levelOrder = function (root: TreeNode | null) {
	if (root == null) {
		return []
	}
	//队列
	let queue = []
	let res: [][] = []
	//根节点入队
	queue.push(root)
	while (queue.length) {
		let levelNum = queue.length
		let subList: any = []
		for (let i = 0; i < levelNum; i++) {
			let node: any = queue.pop()!
			subList.push(node.val)
			if (node.left != null) queue.push(node.left)
			if (node.right != null) queue.push(node.right)
		}
		res.push(subList)
	}
	return res
}

export default levelOrder
