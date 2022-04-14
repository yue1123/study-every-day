interface TreeNodeOptions {
	val: any
	left: TreeNode | null
	right: TreeNode | null
}

export class TreeNode {
	public val: any
	public left: TreeNode | null
	public right: TreeNode | null
	constructor({ val, left, right }: TreeNodeOptions) {
		this.val = val === undefined ? 0 : val
		this.left = left === undefined ? null : left
		this.right = right === undefined ? null : right
	}
	setVal(val: any) {
		this.val = val
		return val
	}
	setLeft(val: TreeNode) {
		this.left = val
		return val
	}
	setRight(val: TreeNode) {
		this.right = val
		return val
	}
}

export function generateTreeNodeByArray(arr: any[]): TreeNode {
	let len = arr.length
	let i = 0
	arr = arr.map((item) => {
		if (item === null) return null
		return new TreeNode({
			val: item,
			left: null,
			right: null
		})
	})
	let treeNode = arr[0]
	while (i < len) {
		if (arr[i]) {
			arr[i].setLeft(arr[2 * i + 1])
			arr[i].setRight(arr[2 * i + 2])
		}
		i++
	}
	return treeNode
}

// console.log(
// 	JSON.stringify(
// 		generateTreeNodeByArray([3, 9, 20, null, null, 15, 7, 11, 12, 13, 14, 15, 16, 17, 18])
// 	)
// )

// let a = {
// 	val: 3,
// 	left: { val: 9, left: null, right: null },
// 	right: {
// 		val: 20,
// 		left: { val: 15, left: { val: 15 }, right: { val: 16 } },
// 		right: { val: 7, left: { val: 17 }, right: { val: 18 } }
// 	}
// }
