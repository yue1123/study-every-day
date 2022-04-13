/**
 * @param {number} x
 * @return {number}
 */
var reverseNumber = function (x: number) {
	let res = 0
	const MAX = Math.pow(2, 31) - 1
	const MIN = MAX * -1
	while (x !== 0) {
		res = res * 10 + (x % 10 | 0)
		// 判断是否溢出最大或最小
		if (res < MIN || res > MAX) {
			return 0
		}
		// 数字除10,便于下一次取数字最后一位
		x = (x / 10) | 0
	}
	return res
}

export default reverseNumber
