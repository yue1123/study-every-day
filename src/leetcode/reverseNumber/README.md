# 整数反转

给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
如果反转后整数超过 32 位的有符号整数的范围  [−231,  231 − 1] ，就返回 0。
假设环境不允许存储 64 位整数（有符号或无符号）。



## 示例 1：

```txt
输入：x = 123
输出：321
```

## 示例 2：

```txt
输入：x = -123
输出：-321
```

## 示例 3：

```txt
输入：x = 120
输出：21
```

## 示例 4：

```txt
输入：x = 0
输出：0
```

## 提示：

```txt
-231 <= x <= 231 - 1
```


## 题解
技巧: 使用%运算可以取数字最后一位

![https://pic.leetcode-cn.com/a161e3f0d41ad2866cb2bffe12084963b4e4c2e20086b71e377618d6b944fe4c-image.png](https://pic.leetcode-cn.com/a161e3f0d41ad2866cb2bffe12084963b4e4c2e20086b71e377618d6b944fe4c-image.png)


![https://pic.leetcode-cn.com/1648177243-YEswdm-image.png](https://pic.leetcode-cn.com/1648177243-YEswdm-image.png)