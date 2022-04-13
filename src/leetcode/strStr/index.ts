/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
// 暴力破解法
var strStr = function (haystack: string, needle: string): number {
	if (needle === '') return 0
	let len1 = haystack.length
	let len2 = needle.length
	let i = 0
	let j = 0
	while (i < len1 && j < len2) {
		if (haystack.charCodeAt(i) === needle.charCodeAt(j)) {
			i++
			j++
		} else {
			i = i - j + 1
			j = 0
		}
		if (j === len2) {
			return i - j
		}
	}
	return -1
}
export default strStr
