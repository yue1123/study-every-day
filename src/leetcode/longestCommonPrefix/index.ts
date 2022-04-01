/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs: string[]): string {
	let len = strs.length
	if (!len) {
		return ''
	}
	let i = 0,
		j = 0
	let pre = strs[0]
	while (i < len) {
		//不断的截取
		while (strs[i].indexOf(pre) !== 0) pre = pre.substring(0, pre.length - 1)
		i++
	}

	return pre
}

export default longestCommonPrefix
