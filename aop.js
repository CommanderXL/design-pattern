function Middleware () {
  this.cache = []
  this.options = null
}

Middleware.prototype.use = function (fn) {
  if (typeof fn !== 'function') {
    throw 'fn must be a function'
  }
  this.cache.push(fn)
  return this
}

Middleware.prototype.next = function () {
  if (this.middlewares && this.middlewares.length) {
    let ware = this.middlewares.shift()
    ware.call(this, this.options, this.next.bind(this))
  } 
}

Middleware.prototype.handleRequest = function (options) {
  this.options = options
  this.middlewares = this.cache.map(fn => fn)
  this.next(options)
}

let middleware = new Middleware()
middleware.use((options, next) => {
  options.middleware1 = 'middleware1'
  console.log(options)
  next()
})

middleware.use((options, next) => {
  options.middleware2 = 'middleware2'
  console.log(options)
  next()
})

middleware.use((options, next) => {
  options.middleware3 = 'middleware3'
  setTimeout(() => {
    console.log(options)
    next()
  }, 1000)
})

middleware.handleRequest({middleware: 'middleware'})