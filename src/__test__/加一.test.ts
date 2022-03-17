import plusOne from '../leetcode/加一'

test('正常加一', () => {
	expect(plusOne([1, 2, 3])).toEqual([1, 2, 4])
})

test('进制', () => {
	expect(plusOne([1, 2, 9])).toEqual([1, 3, 0]) 
})

test('连续进制', () => {
	expect(plusOne([9, 9, 9])).toEqual([1, 0, 0, 0])
})
