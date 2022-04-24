/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s: string): number {
	let strLen = 0
	for (let index = s.length - 1; index >= 0; index--) {
		const element = s[index]
		if (element !== ' ') {
			strLen++
			continue
		}
		if (strLen) return strLen
	}
	return strLen
}

export default lengthOfLastWord
