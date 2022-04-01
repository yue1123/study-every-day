import longestCommonPrefix from '../leetcode/longestCommonPrefix'

test('有公共前缀', () => {
	expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toBe('fl')
})

test('无公共前缀', () => {
	expect(longestCommonPrefix(['reflower', 'flow', 'flight'])).toBe('')
})
