/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums: number[]): number[] {
	let index = 0,
		len = nums.length
	for (let i = 0; i < len; i++) {
		const element = nums[i]
		if (element !== 0) {
			nums[index++] = element
		}
	}
	while (index < len) {
		nums[index++] = 0
	}
	return nums
}

export default moveZeroes
