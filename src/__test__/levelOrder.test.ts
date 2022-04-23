import { generateTreeNodeByArray } from '../DataStructuresAlgorithms/TreeNode'
import levelOrder from '../leetcode/levelOrder'

test('多层',() => {
  const treeNode = generateTreeNodeByArray([3, 9, 20, null, null, 15, 7])
  expect(levelOrder(treeNode)).toStrictEqual([[3], [9, 20], [15, 7]])
}) 

test('单个节点',() =>{
  const treeNode = generateTreeNodeByArray([1])
  expect(levelOrder(treeNode)).toStrictEqual([[1]])
})

test('空节点',() =>{
  const treeNode = generateTreeNodeByArray([])
  expect(levelOrder(treeNode)).toStrictEqual([])
})

