import isValidBrackets from '../leetcode/isValidBrackets'

test('用例1: ()', () => {
	expect(isValidBrackets('()')).toBe(true)
})

test('用例2: ()[]{}', () => {
	expect(isValidBrackets('()[]{}')).toBe(true)
})

test('用例2: (]', () => {
	expect(isValidBrackets('(]')).toBe(false)
})

test('用例3: ([)]', () => {
	expect(isValidBrackets('([)]')).toBe(false)
})
