class LazyLoad {
  constructor () {
    this.cache = []
  }

  loadScriptJs (src, cb) {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = 'async'
    script.src = src

    script.onload = script.onreadystatechange = function () {
      if (!this.readState || this.readyState === 'loaded' || this.readyState === 'complete') {
        cb && cb()
      }
    }   

    document.getElementsByTagName('head')[0].appendChild(script)
  }

  loadAjaxJs (src, name, cb) {
    let xhr = new XMLHttpRequest()
    let _this = this
    xhr.open('GET', src, true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const fn = new Function('', xhr.responseText)
        const resolvedFn = _this.resolveFn({
          name,
          fn
        })
        _this.cache.push(fn)
        cb && cb(resolvedFn)
      }
    }
    xhr.send(null)
  }

  // 变更程序执行的状态
  resolveFn ({name, fn}) {
    fn.resolved = false
    return function () {
      fn()
      if (!fn.resolved) {
        fn.resolved = true
      }
    }
  }

  loadCss () {

  }
}