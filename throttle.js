function throttle (fn, interval) {
  let timer 
  let firstTime = true

  // 返回的函数接受到的函数传入fn
  return function () {
    let args = arguments

    // 如果是第一次调用的话就立即执行
    if (firstTime) {
      fn.apply(this, args)
      return firstTime = false
    }

    // timer定时器还存在的情况
    if (timer) {
      return false
    }

    timer = setTimeout(function () {
      clearTimeout(timer)
      timer = null
      fn.apply(this, args)
    }, interval || 500)
  }
}

window.onresize = throttle(function (e) {
  // do something
}, 500)
