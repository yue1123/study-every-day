/**
 * @param {string} s
 * @return {number}
 */
var bracketsMaxDepth = function (s: string): number {
	let max = 0
	let cur = 0

	for (let i = 0; i < s.length; i++) {
		const element = s.charAt(i)
		if (element === '(') {
			cur += 1
		} else if (element === ')') {
			max = cur > max ? cur : max
			cur--
		}
	}
	return max
}

console.log(bracketsMaxDepth('(1)+((2))+(((3)))'))
console.log(bracketsMaxDepth('(1+(2*3)+((8)/4))+1'))
