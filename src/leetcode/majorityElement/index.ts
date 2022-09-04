/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums: number[]): number {
	const hashMap = new Map()
	const len = nums.length
	const halfLen = len / 2
	for (let i = 0; i < len; i++) {
		const element = nums[i]
		let cur = hashMap.get(element)
		if (cur !== undefined) {
			if (++cur > halfLen) {
				return element
			}
			hashMap.set(element, cur)
		} else {
			hashMap.set(element, 1)
		}
	}
	return nums[0]
}

export default majorityElement
