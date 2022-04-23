# 验证二叉搜索树

给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。

有效 二叉搜索树定义如下：

-   节点的左子树只包含 小于 当前节点的数。
-   节点的右子树只包含 大于 当前节点的数。
-   所有左子树和右子树自身必须也是二叉搜索树。

## 示例 1：

![https://assets.leetcode.com/uploads/2020/12/01/tree1.jpg](https://assets.leetcode.com/uploads/2020/12/01/tree1.jpg)

```js
输入：root = [2,1,3]
输出：true
```

## 示例 2：

![https://assets.leetcode.com/uploads/2020/12/01/tree2.jpg](https://assets.leetcode.com/uploads/2020/12/01/tree2.jpg)

```txt
输入：root = [5,1,4,null,null,3,6]
输出：false
```

解释：根节点的值是 5 ，但是右子节点的值是 4 。

## 题解

## 递归求解

递归共性: 遍历每一个节点,验证他们左右节点,是否符合规范
递归出口:

-   根节点为 null
-   一旦不符合,返回 false
-   遍历完所有节点,都符合,返回 true
