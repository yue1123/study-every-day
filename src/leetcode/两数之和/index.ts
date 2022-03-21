/** 暴力双循环
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum1 = function (nums: number[], target: number) {
	let i = 0,
		j = 0

	while (i < nums.length) {
		while (j < nums.length) {
			if ((i !== j && nums[i] + nums[j]) === target) {
				console.log([i, j], nums[i], nums[j])
				return [i, j]
			}
			j++
		}
		i++
		j = 0
	}
}

/**
 * 双指针
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum2 = function (nums: number[], target: number) {
	let i = 0,
		j = 1
	let len = nums.length
	while (nums[i] + nums[j] !== target) {
		if (j === len - 1) {
			i++
			j = i
		}
		j++
	}
	return [i, j]
}

/**
 * hashmap
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum3 = function (nums: number[], target: number) {
	const map = new Map()
	for (let i = 0, len = nums.length; i < len; i++) {
		const element = nums[i]
		if (map.get(element) !== undefined) {
			return [map.get(element), i]
		}
		map.set(target - element, i)
	}
}

console.log(twoSum3([3, 2, 4], 6))

export { twoSum1, twoSum2, twoSum3 }
// i=0
// {
//   3:0
// }
// i=1
// {
//   3:0,
//   4:1
// }
// i=2
// {
//   3:0,
//   4:1,
//   2:2
// }
