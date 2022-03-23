/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix: number[][]): void {
	// 先上下交换
	let len = matrix.length
	for (let i = 0; i < len / 2; i++) {
		let temp = matrix[i]
		matrix[i] = matrix[len - 1 - i]
		matrix[len - 1 - i] = temp
	}
	// 再对角线交换
	for (let i = 0; i < len; i++) {
		for (let j = i + 1; j < len; j++) {
			let temp = matrix[i][j]
			matrix[i][j] = matrix[j][i]
			matrix[j][i] = temp
		}
	}
}

export default rotate

/**
 * 对角线交换算法
 * [
 *  [ 7, 8, 9 ],
 *  [ 4, 5, 6 ],
 *  [ 1, 2, 3 ]
 * ]
 * i = 0, j = 1
 * arr[i][j] = 8
 * arr[j][i] = 4
 */
