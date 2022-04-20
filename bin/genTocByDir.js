const fs = require('fs')
const path = require('path')
const cwd = process.cwd()

const exclude = ['.DS_Store', '__test__']
const dirMapText = {
	'./src/angularParamsInject': 'angular 参数注入实现',
	'./src/ECMAscript': '手写 ECMAscript 方法',
	'./src/leetcode': 'leetCode 每日算法题',
	'./src/Typescript': 'Typescript'
}
const excludeExt = /\.(ts|md|js)$/

// console.log(data)

function readdirDeep(p) {
	const absolutePath = path.resolve(cwd, p)
	const stat = fs.statSync(absolutePath)
	const rootData = { path: p.replace('src/', './src/') }
	rootData.children = []
	if (stat.isDirectory()) {
		const data = fs.readdirSync(absolutePath)
		for (const dir of data) {
			if (exclude.includes(dir)) continue
			let temp = readdirDeep([p, dir].join('/'))
			temp.text = dir
			rootData.children.push(temp)
		}
	}
	return rootData
}

function getReadmeTitle(path) {
	let _path = `${path}/README.md`
	if (fs.existsSync(_path)) {
		let mdStr = fs.readFileSync(_path)
		let res = /#\W.*/.exec(mdStr)
		if (res && res[0]) {
			return res[0].replace(/#/g, '')
		}
	}
	return ''
}

const data = readdirDeep('src')

// fs.writeFileSync('./test.json', JSON.stringify(data))
const mdTemplate = (text, path, space = '') => `${space}- [${text}](${path})\n`
function genMarkdown(data, deep = 1) {
	let text = ''
	if (deep > 2) return ''
	const _data = (data.children || []).filter((item) => !excludeExt.test(item.path))
	for (const item of _data) {
		text += dirMapText[item.path]
			? mdTemplate(dirMapText[item.path], item.path, new Array(deep).join('  '))
			: mdTemplate(
					`${item.text} ${getReadmeTitle(item.path)}`,
					item.path,
					new Array(deep).join('  ')
			  )
		if (item.children) {
			text += genMarkdown(item, deep + 1)
		}
	}
	return text
}

const mdText = `## 学习代码记录
每天进步一点点,保持github常绿🍏

${genMarkdown(data)}`

fs.writeFileSync('./README.md', mdText)
