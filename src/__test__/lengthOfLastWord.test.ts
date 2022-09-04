import lengthOfLastWord from '../leetcode/lengthOfLastWord'

test('用例1: "Hello World"', () => {
	expect(lengthOfLastWord('Hello World')).toBe(5)
})

test('用例2: "luffy is still joyboy"', () => {
	expect(lengthOfLastWord('luffy is still joyboy')).toBe(6)
})

test('用例3: "    fly me   to   the moon  "', () => {
	expect(lengthOfLastWord('   fly me   to   the moon  ')).toBe(4)
})

test('用例3: "a"', () => {
	expect(lengthOfLastWord('a')).toBe(1)
})
 