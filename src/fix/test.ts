import { removeRebundantSpace, addSpace } from './space'
import { quoteSymbol, normalSymbol } from './pun'
let str = `
// str string
// 测试,,阿发
str = dReplaceAt(str, pos, symbol['ahh'])
`

str = removeRebundantSpace(str)
str = addSpace(str)
console.log(str)

str = quoteSymbol(str)
str = normalSymbol(str)
console.log(str)
