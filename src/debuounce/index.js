/**
 *
 * @param {(...arg) => void} fn 回调函数
 * @param {number} wait 等待时间
 * @param {boolean} immediate 是否立即出发
 */
function debounce(fn, wait, immediate) {
  if (fn === undefined || typeof fn !== 'function') throw new Error('must have a callback fn')
  if (typeof wait === 'boolean') immediate = wait
  if (wait === undefined || typeof wait !== 'number') wait = 300
  let timer = null
  return function proxy(...arg) {
    let _this = this
    let _immediate = immediate && !timer
    clearTimeout(timer)
    timer = setTimeout(() => {
      !immediate && fn.apply(_this, arg)
      timer = null
    }, wait)
    _immediate && fn.apply(_this, arg)
  }
}
