/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board: string[][]): boolean {
	// 行
	let cell = Object.create(null)
	// 列
	let col = Object.create(null)
	// 3x3九宫格
	let box = Object.create(null)
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			let nums = board[i][j]
			if (nums === '.') continue
			let boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3)
			let keyCell = i + '' + nums,
				keyCol = j + '' + nums,
				keyBox = boxIndex + '' + nums

			if (cell[keyCell] || col[keyCol] || box[keyBox]) {
				return false
			}
			cell[keyCell] = true
			col[keyCol] = true
			box[keyBox] = true
		}
	}
	return true
}

export default isValidSudoku
