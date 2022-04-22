/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums: number[], target: number): number {
	let len = nums.length
	for (let i = 0; i < len; i++) {
		const element = nums[i]
		if (target <= element) {
			return i
		}
	}
  return len
}

export default searchInsert
