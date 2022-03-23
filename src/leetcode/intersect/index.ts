/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
export function intersect(nums1: number[], nums2: number[]): number[] {
	nums1 = nums1.sort((a, b) => a - b)
	nums2 = nums2.sort((a, b) => a - b)
	let len1 = nums1.length,
		len2 = nums2.length
	let arr = []
	let i = 0,
		j = 0

	while (i < len1 && j < len2) {
		if (nums1[i] === nums2[j]) {
			arr.push(nums1[i])
			j++
			i++
		} else {
			nums1[i] < nums2[j] ? i++ : j++
		}
	}
	return arr
}
