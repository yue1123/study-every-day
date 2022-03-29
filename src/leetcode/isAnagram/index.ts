/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s: string, t: string) {
	const map = new Map()
	let len1 = s.length,
		len2 = t.length
	if (len1 !== len2) return false
	for (let i = 0; i < len1; i++) {
		const item = s[i]
		const temp = map.get(item)
		map.set(item, temp ? temp + 1 : 1)
	}
	//
	for (let i = 0; i < len2; i++) {
		const item = t[i]
		const temp = map.get(item)
		map.set(item, temp ? temp - 1 : 1)
	}
	for (const count of map.values()) {
		if (count !== 0) return false
	}
	return true
}


export default isAnagram
