const liteRequire = new LiteRequire()
liteRequire.config({
  baseUrl: 'http://localhost:8080',
  paths: {
    throttle: '/throttle.js',
    marco: '/marco.js',
    debounce: '/debounce.js',
    a: 'lite-require/a.js',
    b: 'lite-require/b.js',
    c: 'lite-require/c.js',
    d: 'lite-require/d.js',
    e: 'lite-require/e.js',
    f: 'lite-require/f.js'
  }
})

liteRequire.define(['a', 'b'], function () {

})