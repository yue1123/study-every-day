import addBinary from '../leetcode/addBinary'

test('测试用例1: "1" + "11"', () => {
	expect(addBinary('1', '11')).toBe('100')
})

test('测试用例2: "1010" + "1011"', () => {
	expect(addBinary('1010', '1011')).toBe('10101')
})
