import strStr from '../leetcode/strStr'


test('正常返回index',() => {
  expect(strStr('hello', 'll')).toBe(2)
})

test('找不到index的情况,-1', () => {
	expect(strStr('aaaaa', 'bba')).toBe(-1)
})

test('零的情况', () => {
	expect(strStr('', '')).toBe(0)
})