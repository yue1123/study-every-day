const template = `
  <template>
    <div>
      <button text="添加" @click="handleAdd"></button>
      <button text="删除" @click="handleAdd"></button>
      <div>
      <button text="添加" @click="handleAdd"></button>
      <button text="删除" @click="handleAdd"></button>
    </div>
    </div>
  </template>`

const startTagWithAttrsReg = /<(\w+)(\s*\w+=".*"\s*)*>/g
const endTagReg = /<\/\w+>/g
const attrReg = /([@\w]+)="\s*([\u4e00-\u9fa5\w]+)\s*"/g
const eventReg = /@(\w+)/

function parseAttr(attrStr) {
  const res = [...attrStr.matchAll(attrReg)]

  return res.reduce((attrObj, [_, attr, attrValue]) => {
    attr = attr.replace(eventReg, (str) => 'on' + str.replace(/@(\w)/g, (_, first) => first.toUpperCase()))
    attrObj[attr] = attrValue
    return attrObj
  }, Object.create(null))
}

function parse(tag, attrs, ...children) {
  attrs = attrs ? parseAttr(attrs) : {}
  return {
    type: tag,
    ...attrs,
    children
  }
}

const parseRes = template
  .replace(startTagWithAttrsReg, function (_, tag, attrs) {
    const _attrs = attrs ? `\`${attrs.trimStart()}\`` : null
    return `parse(\`${tag}\`, ${_attrs}, `
  })
  .replace(endTagReg, (str, _, rawStr) => {
    const isEnd = rawStr.endsWith(str)
    return ')' + (isEnd ? '' : ',')
  })

const getPageJsContent = (domObj) => `class Page {
  constructor() {
    page.render(${domObj})
  }
}`

console.log(getPageJsContent(JSON.stringify(eval(parseRes), null, 2)))
