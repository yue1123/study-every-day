import { TreeNode } from '../../DataStructuresAlgorithms/TreeNode/index'
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums: number[]): TreeNode | null {
	if (!nums.length) return null
	// 右移操作符取数组中间索引
	let mid = nums.length >> 1
	const root = new TreeNode(
		nums[mid],
		sortedArrayToBST(nums.slice(0, mid)),
		sortedArrayToBST(nums.slice(mid + 1))
	)
	return root
}
