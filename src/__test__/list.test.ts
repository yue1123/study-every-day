import List from '../DataStructuresAlgorithms/List/index'

const newList = new List<boolean | string>()


newList.append('1')
test('添加一个元素后的长度', () => {
    newList.append('2')
	expect(newList.length).toBe(2)
})
test('添加一个元素后的长度', () => {
	newList.append('3')
	expect(newList.length).toBe(3)
})
test('当前的位置', () => {
	expect(newList.currPos()).toBe(0)
})

test('左移一个位置', () => {
    newList.next()
	expect(newList.currPos()).toBe(1)
})
test('左移一个位置', () => {
	newList.prev()
	expect(newList.currPos()).toBe(0)
})


test('左移一个位置', () => {
	newList.insert('我是插队的', '2')
	expect(newList.toString()).toBe('1,2,我是插队的,3')
})
console.log(newList.insert('我是插队的', '2'))