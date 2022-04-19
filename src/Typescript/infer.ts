
// 解释,为什么可以拆出第一个
/**
 * extends 是判断两个值是否相等的
 * 要让后一个数组等一前一个数组,通过infer就必须推断出和前一个数组一样的结构
 */
type inferTest = [12, 3, 4] extends [infer F, ...infer Rest] ? [...Rest, F] : 1
