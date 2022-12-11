/**
 *
 * @param {(...arg) => void} fn 回调函数
 * @param {number} wait 等待时间
 * @returns {(...arg) => void}
 */
function throttle(fn, wait) {
  if (typeof fn !== 'function') throw new Error('fn must be a function')
  if (wait === undefined || typeof wait !== 'number') wait = 300
  let timer = null
  return function proxy(...arg) {
    let _this = this
    if (!timer) {
      fn.apply(_this, arg)
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
      }, wait)
    }
  }
}
