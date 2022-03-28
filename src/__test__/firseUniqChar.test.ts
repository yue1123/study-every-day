import firstUniqChar from '../leetcode/firstUniqChar'

test('测试用例1', () => {
	expect(firstUniqChar('leetcode')).toBe(0)
})

test('测试用例2', () => {
	expect(firstUniqChar('loveleetcode')).toBe(2)
})

test('没有只出现一个的字符', () => {
	expect(firstUniqChar('aabb')).toBe(-1)
})
