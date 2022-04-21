/**
 * @param {string} s
 * @return {boolean}
 */
var isValidBrackets = function (s: string) {
	if (s.length === 1) return false
	let stack = []
	let map = {
		'(': ')',
		'[': ']',
		'{': '}'
	}
	for (let i = 0, len = s.length; i < len; i++) {
		let ele = s[i]
		if (map[ele]) {
			stack.push(map[ele])
			continue
		}
		if (stack.pop() !== ele) return false
	}
	return !stack.length
}

export default isValidBrackets
// console.log(isValidBrackets('()'))
