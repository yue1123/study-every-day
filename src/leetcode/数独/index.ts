/**
 * @param {character[][]} board
 * @return {boolean}
 */

var isValidSudoku = function (board: string[][]) {
	let row = {}
	let col = {}
	let box = {}
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			let num = board[i][j]
			if (num !== '.') {
				let boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3)
				console.log(boxIndex)
				if (
					row[i + '' + num] ||
					col[j + '' + num] ||
					box[boxIndex + '' + num]
				) {
					return false
				}
				row[i + '' + num] = true
				col[j + '' + num] = true
				box[boxIndex + '' + num] = true
			}
		}
	}
	return true
}

export default isValidSudoku
