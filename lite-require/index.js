class Util {
  constructor () {}
}

const util = new Util()


class PubSub {
  constructor () {
    this.subscribers = {}
  }

  pub (type, data) {
    this.subscribers[type] = this.subscribers[type] || []
    this.subscribers[type].forEach(sub => {
      sub(data)
    })
  }

  sub (type, fn) {
    this.subscribers[type] = this.subscribers[type] || []
    this.subscribers[type].push(fn)
  }
}

// js加载器
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
        const resolvedFn = _this._resolveFn({
          name,
          fn
        })
        _this.cache.push(fn)
        cb && cb({
          resolvedFn,
          fnStr: xhr.responseText
        })
      }
    }
    xhr.send(null)
  }

  // 变更程序执行的状态
  _resolveFn ({name, fn}) {
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

  loadImg () {

  }
}

const lazyLoad = new LazyLoad()

class LiteRequire extends PubSub {
  constructor () {
    super()
    this.moduleMap = {}
    this.fnMap = {}
  }

  config (obj) {
    const baseUrl = obj.baseUrl || ''     // 添加对于路径的处理
    const paths = obj.paths || {}
    for (let key in paths) {
      this.moduleMap[key] = `${baseUrl}/${paths[key]}`
    }
  }

  // 加载方法
  define (...args) {
    let modules = []
    let cb = null
    const _this = this
    if (args.length === 2) {
      if (Array.isArray(args[0])) {
        modules = args[0]
      }
      if (typeof args[1] === 'function') {
        cb = args[1]
      }
      this._recursive(modules)
    } else if (args.length === 1) {
      if (typeof args[0] === 'function') {

      }
    }
  }

  // 异步递归 ?  分析与加载
  _recursive (modules) {
    // let module = this.moduleMap[modules.shift()]
    let _this = this
    modules.forEach(module => {
      module = this.moduleMap[module]
      lazyLoad.loadAjaxJs(module, module, function ({resolvedFn, fnStr}) {
        let pattern = /define\(\[(.*)\],/
        if (fnStr.match(pattern)) {
          let match = fnStr.match(pattern)[1]
          let moduleArr = match.split(',')
          let subModules = moduleArr = moduleArr.map(moduleStr => {
            let str = moduleStr.replace(/["']/g, '')
            return str.trim()
          })
          // 加载
          if (subModules.length) {
            _this._recursive(subModules)
          }
        } 
      }) 
    })
    /*let module = this.moduleMap[subModules.length ? subModules.shift() : modules.shift()]
    let _this = this
    if (module) {
      lazyLoad.loadAjaxJs(module, module, function ({resolvedFn, fnStr}) {
        let pattern = /define\(\[(.*)\],/
        if (fnStr.match(pattern)) {
          let match = fnStr.match(pattern)[1]
          let moduleArr = match.split(',')
          moduleArr = moduleArr.map(moduleStr => {
            let str = moduleStr.replace(/["']/g, '')
            return str.trim()
          })
          subModules = moduleArr
          // 加载
          if (subModules.length) {
            _this._recursive(modules, subModules)
          }
          // _this._recursive(modules)
        } else if (subModules.length){
          _this._recursive(modules, subModules)
        } else {
          _this._recursive(modules, [])
        }
      }) 
    } else {
      return true
    }*/
  }
}


// new Function 创建出来的都是匿名函数吗?