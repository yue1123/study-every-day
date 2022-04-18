import { generateTreeNodeByArray } from '../DataStructuresAlgorithms/TreeNode'
import isValidBST from '../leetcode/isValidBST'

test('测试无效二叉搜索树', () => {
	const testCase = generateTreeNodeByArray([5, 1, 4, null, null, 3, 6])
	expect(isValidBST(testCase)).toBe(false)
}) 

test('测试有效二叉搜索树', () => {
	const testCase = generateTreeNodeByArray([2, 1, 3])
	expect(isValidBST(testCase)).toBe(true)
}) 
