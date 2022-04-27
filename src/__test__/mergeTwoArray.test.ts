import mergeTwoArray from '../leetcode/mergeTwoArray'

test('nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3', () => {
	let nums1 = [1, 2, 3, 0, 0, 0]
	mergeTwoArray(nums1, 3, [2, 5, 6], 3)
	expect(nums1).toEqual([1, 2, 2, 3, 5, 6])
})

test('nums1 = [1], m = 1, nums2 = [], n = 0', () => {
	let nums1 = [1]
	mergeTwoArray(nums1, 1, [], 0)
	expect(nums1).toEqual([1])
})
