# 反转链表
给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

## 示例 1：

```txt
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]
```

## 示例 2：

```txt
输入：head = [1,2]
输出：[2,1]
```

## 示例 3：

```txt
输入：head = []
输出：[]
```

## 提示：

-   链表中节点的数目范围是 [0, 5000]
-   -5000 <= Node.val <= 5000

进阶：链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？


## 题解
### 栈

利用栈的先入后出,反转链表
先遍历链表入栈,在遍历栈,构成新的链表

### 双链表
![https://mmbiz.qpic.cn/mmbiz_png/PGmTibd8KQBHac4ba8uZgNN7pmWsxcqib9IEdRXXIfsklU8STcMichyDurliaYmt0XqwmNNTK2OEeIZCjARpFXt4Vw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1](https://mmbiz.qpic.cn/mmbiz_png/PGmTibd8KQBHac4ba8uZgNN7pmWsxcqib9IEdRXXIfsklU8STcMichyDurliaYmt0XqwmNNTK2OEeIZCjARpFXt4Vw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)
![https://mmbiz.qpic.cn/mmbiz_png/PGmTibd8KQBHac4ba8uZgNN7pmWsxcqib9ibF21VvsZZWlsibTHIGrvvpPQe0fc8XTC6YicZTqicV9icbYrHOGuOCR9BA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1](https://mmbiz.qpic.cn/mmbiz_png/PGmTibd8KQBHac4ba8uZgNN7pmWsxcqib9ibF21VvsZZWlsibTHIGrvvpPQe0fc8XTC6YicZTqicV9icbYrHOGuOCR9BA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)