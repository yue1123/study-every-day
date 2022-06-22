/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a: string, b: string): string {
	let i = a.length - 1
	let j = b.length - 1
	let up = 0
	let res: string[] = []
	while (i >= 0 || j >= 0) {
		let cur1 = (a.charAt(i) as unknown as number) - ('0' as unknown as number)
		let cur2 = (b.charAt(j) as unknown as number) - ('0' as unknown as number)
		let temp = cur1 + cur2 + up
		if (temp >= 2) {
			up = 1
			temp -= 2
		} else {
			up = 0
		}
		i--
		j--
		res.unshift(temp + '')
	}
	up && res.unshift('1')
	return res.join('')
}

export default addBinary
