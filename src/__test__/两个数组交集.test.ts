import { intersect } from '../leetcode/两个数组的交集/index'

test('交集', () => {
	expect(JSON.stringify(intersect([4, 9, 5], [9, 4, 9, 8, 4]))).toBe('[4,9]')
})
