import maxSubArray from '../leetcode/maxSubArray'

test('[-2,1,-3,4,-1,2,1,-5,4]', () => {
	expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6)
})

test('[5,4,-1,7,8]', () => {
	expect(maxSubArray([5, 4, -1, 7, 8])).toBe(23)
})
