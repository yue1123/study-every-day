import isPalindrome from '../leetcode/isPalindrome'


test('有效回文字符串', () => {
	expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true)
})

test('无效回文字符串', () => {
	expect(isPalindrome('0P')).toBe(false)
})
