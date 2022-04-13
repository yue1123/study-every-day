// 逻辑操作符
namespace logicalOperator {
	// 实现一个if
	export type If<
		Condition1 extends boolean,
		Condition2 extends boolean
	> = Condition1 extends Condition2 ? true : false

	type testIf = If<boolean, boolean>

	// 实现与操作符
	export type And<
		Condition1 extends boolean,
		Condition2 extends boolean
	> = Condition1 extends true
		? Condition2 extends true
			? true
			: false
		: false

	type testAnd = And<true, true>

	type testMultiple = And<And<true, true>, And<true, true>>

	// 实现或操作符
	export type Or<
		Condition1 extends boolean,
		Condition2 extends boolean
	> = Condition1 extends true ? true : Condition2 extends true ? true : false

	type testOr = Or<true, false> // true

	// 实现非
	export type Not<Condition1 extends boolean> = Condition1 extends true
		? false
		: true

	type testAnd_Not = And<Not<false>, true> // true
}

// // 递归
// type Example<
// 	C extends boolean = true,
// 	Tuple extends unknown[] = [1]
// > = C extends true ? Example<false, [...Tuple, 1]> : Tuple

// type Result = Example<true> // [1, 1]

namespace method {
	// 判断左侧类型是否和右侧类型一致
	// 利用函数泛型获取一个新泛型T
	export type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
		T1
	>() => T1 extends B ? 1 : 2
		? true
		: false

	type testIsEqual1 = IsEqual<1, 1 | 2> // false
	type testIsEqual2 = IsEqual<1 | 2, 1 | 2> // true

	// toString
	export type canStringType =
		| string
		| number
		| boolean
		| bigint
		| null
		| undefined

	export type toString<T extends canStringType> = `${T}`

	type testToString = toString<1233> // '1233'
	type testToString1 = toString<false> // 'false'
	type testToString2 = toString<null> // 'null'
}

namespace common {
	export type NumberLike = number | method.toString<number>

	export type CheckLeftIsExtendsRight<
		T extends any,
		R extends any
	> = T extends R ? true : false

	export type isZero<T extends NumberLike> = CheckLeftIsExtendsRight<
		T,
		0 | '0'
	>

	type testIsZero = isZero<'0'> // true
	type testIsZero1 = isZero<'1'> // false

	type IsOverZero<N extends NumberLike> = isZero<N> extends true
		? false
		: common.CheckLeftIsExtendsRight<
				method.toString<N> extends `${'-'}${infer Rest}` ? Rest : 1,
				1
		  >

	type testIsOverZero = IsOverZero<0> // false
	type testIsOverZero1 = IsOverZero<10> // true
}
