/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s: string): number {
	const map = new Map()
	for (let i = 0, len = s.length; i < len; i++) {
		const item = s[i]
		const temp = map.get(item)
		map.set(item, temp ? temp + 1 : 1)
	}
	for (const [key, value] of map.entries()) {
		if (value === 1) {
			return s.indexOf(key)
		}
	}
	return -1
}

export default firstUniqChar
