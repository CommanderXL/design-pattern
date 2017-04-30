! function (e) {
  function n(o) {
    if (t[o]) return t[o].exports;
    var i = t[o] = {
      exports: {},
      id: o,
      loaded: !1
    };
    return e[o].call(i.exports, i, i.exports, n), i.loaded = !0, i.exports
  }
  var t = {};
  return n.m = e, n.c = t, n.p = "", n(0)
}([function (e, n) {
  "use strict";

  function t(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
  }
  Object.defineProperty(n, "__esModule", {
    value: !0
  });
  var o = function () {
      function e(e, n) {
        for (var t = 0; t < n.length; t++) {
          var o = n[t];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
      }
      return function (n, t, o) {
        return t && e(n.prototype, t), o && e(n, o), n
      }
    }(),
    i = function () {
      function e(n) {
        t(this, e), this.options = n, this.init()
      }
      return o(e, [{
        key: "init",
        value: function () {
          this.initPlayer(), this.eventInit()
        }
      }, {
        key: "initPlayer",
        value: function () {
          var e = this.options;
          e || console.log("\u8bf7\u5b9a\u4e49\u64ad\u653e\u5668\u76f8\u5173\u53c2\u6570"), e.id || console.log("\u8bf7\u5b9a\u4e49\u64ad\u653e\u5668\u5bb9\u5668id"), e.sn || console.log("\u8bf7\u6307\u5b9a\u64ad\u653e\u5185\u5bb9\u5730\u5740sn");
          var n = e.sn,
            t = {
              businessId: "xiaoping",
              channelId: "live_xiaoping",
              sn: encodeURIComponent(n),
              type: "replay",
              autoPlay: !0
            },
            o = {
              menu: "false",
              bgcolor: "#000000",
              wmode: "window",
              allowScriptAccess: "always",
              allowFullScreen: !0
            },
            i = {
              id: e.id,
              name: e.id
            };
          swfobject.embedSWF("https://s5.ssl.qhres.com/static/c14fc0ece63fc739.swf", e.id, "800", "500", "6.0.0", "", t, o, i)
        }
      }, {
        key: "eventInit",
        value: function () {}
      }]), e
    }();
  window.Videoplayer = i, n["default"] = i
}]);