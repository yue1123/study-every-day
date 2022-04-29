/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n: number) {
	let cur = 1,
		pre = 1,
		preOfPre = 1
	for (let i = 2; i <= n; i++) {
		cur = pre + preOfPre
		preOfPre = pre
		pre = cur
	}
	return cur
}

export default climbStairs
// console.log(climbStairs(3))