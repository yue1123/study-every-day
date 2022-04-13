import reverseNumber from '../leetcode/reverseNumber'

test('正数反转', () => {
	expect(reverseNumber(123)).toBe(321)
})

test('负数反转', () => {
	expect(reverseNumber(-123)).toBe(-321)
})
