import { intersect } from '../leetcode/intersect/index'

test('交集', () => {
	expect(intersect([4, 9, 5], [9, 4, 9, 8, 4])).toEqual([4, 9])
})
