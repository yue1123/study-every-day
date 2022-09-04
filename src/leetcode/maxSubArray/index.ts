/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums: number[]) {
	let pre = 0,
		maxRes = nums[0]
	for (let i = 0; i < nums.length; i++) {
		const element = nums[i]
		pre = Math.max(pre + element, element)
		maxRes = Math.max(maxRes, pre)
	}
	return maxRes
}

export default maxSubArray
// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
// [5,4,-1,7,8]
