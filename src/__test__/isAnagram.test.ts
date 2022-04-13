import isAnagram from '../leetcode/isAnagram'

test('正确异位词', () => {
	expect(isAnagram('anagram', 'nagaram')).toBe(true)
})

test('错误异位词', () => {
	expect(isAnagram('rat', 'car')).toBe(false)
})


