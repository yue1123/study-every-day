/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s: string): boolean {
  if (s === '') return true
	s = s.toLowerCase()
	let i = 0
	let len = s.length
	let j = len - 1
	while (i < j) {
		let codeI = s.charCodeAt(i),
			codeJ = s.charCodeAt(j)
		if (
			codeI < 48 ||
			codeI > 122 ||
			(codeI > 57 && codeI < 65) ||
			(codeI > 90 && codeI < 97)
		) {
			i++
			continue
		}
		if (
			codeJ < 48 ||
			codeJ > 122 ||
			(codeJ > 57 && codeJ < 65) ||
			(codeJ > 90 && codeJ < 97)
		) {
			j--
			continue
		}
		if (codeI !== codeJ) {
			return false
		}
		i++
		j--
	}

	return true
}


export default isPalindrome

