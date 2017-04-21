// https://rockjins.js.org/2017/02/21/debounce-function/
// 函数防抖
function debounce (fn, interval, immediate) {
  let timer = null

  // 返回的函数接受的参数传入fn
  return function () {
    let ctx = this
    let args = arguments

    // 定时器时间到了即将执行的函数
    function later () {
      timer = null
      if (!immediate) fn.apply(ctx, args)
    }

    // 如果immediate为true, 且是第一次调用的情况下, 则fn为立即执行
    let callNow = immediate && !timeout
    clearTimeout(timer)
    timer = setTimeout(later, interval)
    if (callNow) fn.apply(ctx, args)
  }
}

document.querySelector('input').addEventListener('keypress', debounce((e) => {
  // do something
}))