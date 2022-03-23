import { twoSum3 } from '../leetcode/twoSum/index'

const tests = [
	{
		test: [[3, 2, 4], 6],
		res: [1, 2]
	},
	{
		test: [[2, 7, 11, 15], 9],
		res: [0, 1]
	},
	{
		test: [[3, 3], 6],
		res: [0, 1]
	}
]

describe('hashmap实现的两数之和', () => {
	tests.forEach((element, index) => {
		it(`用例${index}`, () => {
			expect(
				twoSum3(element.test[0] as number[], element.test[1] as number)
			).toEqual(element.res)
		})
	})
})
