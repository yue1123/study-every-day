import { TreeNode } from '../../DataStructuresAlgorithms/TreeNode'

function isValidBST(
	root: TreeNode | null,
	minVal: number = -Infinity,
	maxVal: number = Infinity
): boolean {
	if (root == null) return true
	//每个节点如果超过这个范围，直接返回false
	if (root.val >= maxVal || root.val <= minVal) return false
	//这里再分别以左右两个子节点分别判断，
	//左子树范围的最小值是minVal，最大值是当前节点的值，也就是root的值，因为左子树的值要比当前节点小
	//右子数范围的最大值是maxVal，最小值是当前节点的值，也就是root的值，因为右子树的值要比当前节点大
	return isValidBST(root.left, minVal, root.val) && isValidBST(root.right, root.val, maxVal)
}
export default isValidBST
