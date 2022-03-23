/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits: number[]) {
	let i = digits.length - 1
	digits[i] += 1
	while (digits[i] >= 10) {
		digits[i] -= 10
		--i
		if (i < 0) {
			digits.splice(0, 0, 1)
		} else {
			digits[i] += 1
		}
	}
	return digits
}

export default plusOne
