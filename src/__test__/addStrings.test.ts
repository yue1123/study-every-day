import addStrings from '../leetcode/addStrings'

// console.log(addStrings('9999', '9999'))
// console.log(addStrings('0', '1'))

test("'9999' 加'9999'",() =>{
  expect(addStrings('9999', '9999')).toBe('19998')
})

test("'9' 加 '99'", () => {
	expect(addStrings('9', '99')).toBe('108')
})

test("'9' 加 '1'", () => {
	expect(addStrings('9', '1')).toBe('10')
})