import reverseString from '../leetcode/reverseString/index'

test('测试反转1', () => {
	let stringArr = ['h', 'e', 'l', 'l', 'o']
	reverseString(stringArr)
	expect(stringArr).toEqual(['o', 'l', 'l', 'e', 'h'])
})
test('测试反转2', () => {
	let stringArr = ['H', 'a', 'n', 'n', 'a', 'h']

	reverseString(stringArr)
	expect(stringArr).toEqual(['h', 'a', 'n', 'n', 'a', 'H'])
})
