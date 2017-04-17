// aop编程 https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651226331&idx=1&sn=566e33d09436520f09779a73d486f520&chksm=bd49595f8a3ed049bcfd661d3359a085611611c48f35d520091ac518ded1bdfeebcee0a9f784&scene=0&key=7fcd3b919c80be62bc09ae6eef0c2d9fe7437b9c6e048ad1e5b8330fefcee07d904809aef7e84cc06064618a334a652a924e45b540f07363cc46d649a977d133c723dbb69ad753b02e30395adbf6540d&ascene=0&uin=NjI4MTk5NjU%3D&devicetype=iMac+MacBookPro11%2C4+OSX+OSX+10.11+build(15A284)&version=12010310&nettype=WIFI&fontScale=100&pass_ticket=Rxc3%2FD6oYRoNUmB%2BeyGQ8y1V5O76bWdXCv0Un4GOeFw%3D
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