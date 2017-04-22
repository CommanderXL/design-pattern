const lazyLoader = new LazyLoad()

lazyLoader.loadAjaxJs('http://localhost:8080/throttle.js', 'throttle', function (fn) {
  fn()
  console.log(lazyLoader.cache[0])
})