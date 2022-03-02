import List from '../src/DataStructuresAlgorithms/List/index'

const newList = new List<boolean | string>()


newList.append('1')
console.log('当前的大小', newList.length)
newList.append('2')
console.log('当前的大小', newList.length)
newList.append('3')
console.log('当前的大小', newList.length)
newList.append('4')
console.log('当前的大小', newList.length)

console.log('当前的位置', newList.currPos())
newList.next()
console.log('当前的位置', newList.currPos())
newList.prev()
console.log('当前的位置', newList.currPos())

newList.insert('我是插队的', '2')

console.log('当前列表', newList.toString())



newList.toString()

