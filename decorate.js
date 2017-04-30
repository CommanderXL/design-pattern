// 装饰者模式
function once (fn) {
  return function () {
    var ret = fn && fn.apply(this, arguments)
    fn = null
    return ret
  }
}

block.onclick = once(function (evt) {
  console.log('hide')
  evt.target.className = 'hide'
  setTimeout(function () {
    document.body.removeChild(block)
  }, 2000)
})