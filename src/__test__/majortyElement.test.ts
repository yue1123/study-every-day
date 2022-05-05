import majorityElement from '../leetcode/majorityElement'

test('[2, 2, 1, 1, 1, 2, 2]', () => {
	expect(majorityElement([2, 2, 1, 1, 1, 2, 2])).toBe(2)
})

test('[3, 2, 3]', () => {
	expect(majorityElement([3, 2, 3])).toBe(3)
})
