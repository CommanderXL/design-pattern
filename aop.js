Function.prototype.before = function (beforeFn) {
  var _self = this
  return function () {
    beforeFn.apply(this, arguments)

    return _self.apply(this, arguments)
  }
}

Function.prototype.after = function (afterFn) {
  var _self = this
  return function () {
    var ret = _self.apply(this, arguments)
    afterFn.apply(this, arguments)

    return ret
  }
}

function wrapParams (params) {
  params.a = 1
}

function reverseGeo () {
  console.log(arguments)
}

reverseGeo = reverseGeo.before(wrapParams)

reverseGeo({b: 1})

