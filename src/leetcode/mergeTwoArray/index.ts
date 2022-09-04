/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var mergeTwoArray = function (nums1: any[], m: number, nums2: any[], n: number): void {
	let len = m + n - 1
	let _m = m - 1
	let _n = n - 1
	let cur
	while (_m >= 0 || _n >= 0) {
		if (_m === -1) {
			cur = nums2[_n--]
		} else if (_n === -1) {
			cur = nums1[_m--]
		} else if (nums1[_m] > nums2[_n]) {
			cur = nums1[_m--]
		} else {
			cur = nums2[_n--]
		}
		nums1[len--] = cur
	}
}
export default mergeTwoArray
/**
 * 2 2
 * 6 [ 1, 2, 3, 0, 0, 6 ]
 * 2 1
 * 5 [ 1, 2, 3, 0, 5, 6 ]
 * 2 0
 * 3 [ 1, 2, 3, 3, 5, 6 ]
 * 1 0
 * 2 [ 1, 2, 2, 3, 5, 6 ]
 * 1 -1
 * 2 [ 1, 2, 2, 3, 5, 6 ]
 * 0 -1
 * 1 [ 1, 2, 2, 3, 5, 6 ]
 */
