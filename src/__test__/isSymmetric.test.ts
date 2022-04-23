import { generateTreeNodeByArray } from '../DataStructuresAlgorithms/TreeNode'

import isSymmetric from '../leetcode/isSymmetric'

test('有效对称二叉树', () => {
	const treeNode = generateTreeNodeByArray([1, 2, 2, 3, 4, 4, 3])
	expect(isSymmetric(treeNode)).toBe(true)
})

test('无效对称二叉树', () => {
	const treeNode = generateTreeNodeByArray([1, 2, 2, null, 3, null, 3])
	expect(isSymmetric(treeNode)).toBe(false)
})
