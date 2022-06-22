/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1: string, num2: string): string {
	let p1 = num1.length - 1
	let p2 = num2.length - 1
	let res = []
	let up = 0
	while (p1 >= 0 || p2 >= 0) {
		let cur1 = (num1.charAt(p1) as unknown as number) - ('0' as unknown as number)
		let cur2 = (num2.charAt(p2) as unknown as number) - ('0' as unknown as number)
		let temp = cur1 + cur2 + up
		if (temp >= 10) {
			up = 1
			temp -= 10
		} else {
			up = 0
		}
		res.unshift(temp + '')
		p1--
		p2--
	}
	up && res.unshift('1')
	return res.join('')
}

export default addStrings
