import moveZeroes from '../leetcode/moveZeroes'

test('移动零', () => {
	expect(moveZeroes([0, 1, 0, 3, 12])).toEqual([1, 3, 12, 0, 0])
})
