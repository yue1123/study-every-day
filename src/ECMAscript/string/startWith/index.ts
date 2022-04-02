function startsWith(this: string, str: string, startIndex?: number) {
	let _this: string = this
	if (typeof startIndex === 'number' && startIndex >= 0) {
		_this = this.slice(startIndex)
	}
	if (_this.indexOf(str) === 0) {
		return true
	}

	return false
}

let str = 'hello,world'

String.prototype.startsWith = startsWith

console.log('123123'.startsWith('123')) // true
console.log('abbcc'.startsWith('cc')) // false
console.log('abbcc'.startsWith('cc', 3)) // true
console.log('abbcc'.startsWith('cc', 10)) // false
