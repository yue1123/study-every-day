import searchInsert from '../leetcode/searchInsert'
let testCase1: [number[], number] = [[1, 3, 5, 6, 9], 10]
let testCase2: [number[], number] = [[1, 3, 5, 6, 9], 2]
let testCase3: [number[], number] = [[1, 3, 5, 6, 9], 3]

test('用例1', () => {
	expect(searchInsert.apply(null, testCase1)).toBe(5)
})

test('用例2', () => {
	expect(searchInsert.apply(null, testCase2)).toBe(1)
})

test('用例3', () => {
	expect(searchInsert.apply(null, testCase3)).toBe(1)
})