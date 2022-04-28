# 两字符串相加

给定两个字符串形式的非负整数 `num1` 和 `num2` ，计算它们的和并同样以字符串形式返回。

你不能使用任何內建的用于处理大整数的库（比如 `BigInteger`）， 也不能直接将输入的字符串转换为整数形式。

**示例 1：**

```txt
输入：num1 = "11", num2 = "123"

输出："134"
```

**示例 2：**

```txt
输入：num1 = "456", num2 = "77"

输出："533"
```

**示例 3：**

```txt
输入：num1 = "0", num2 = "0"

输出："0"
```

**提示：**

* `1 <= num1.length, num2.length <= 10^4`
* `num1` 和 `num2` 都只包含数字 `0-9`
* `num1` 和 `num2` 都不包含任何前导零


### 解题思路
我们小学二年级就学过,两个数字相加,要从后面开始算,大于十就进一位,所以把这个转换成程序即可

1. 双指针从后往前遍历取出每一位相加
	1. 如果大于10,up = 1,在下一次循环中再加上进制
	2. 如果小于10,up = 0
2. 将每次的结果放到res数组的最前面(当然也可以用push,不过最后需要reverse一下)
3. 两个指针前移一位

小技巧: **js 字符串减0可以转成数字**

### 代码

```javascript
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
    let p1 = num1.length - 1
	let p2 = num2.length - 1 
	let res = []
	let up = 0
	while (p1 >= 0 || p2 >= 0) {
		let cur1 = num1.charAt(p1) - '0'
		let cur2 = num2.charAt(p2) - '0'
		let temp = cur1 + cur2 + up
		if (temp >= 10) {
			up = 1
			temp -= 10
		} else {
			up = 0
		}
		p1--
		p2--
		res.unshift(temp + '')
	}
    if (up !== 0) {
		res.unshift('1')
	}
    return res.join('')
};
```
![image.png](https://pic.leetcode-cn.com/1651132926-BEWDhc-image.png)
