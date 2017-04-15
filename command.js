var setCommand = function (button, func) {
  button.onclick = function () {
    func()
  }
}

var MenuBar = {
  refresh: function () {
    console.log('刷新菜单页面')
  }
}

var RefreshMenuBarCommand = function (receiver) {
  return function () {
    receiver.refresh()
  }
}

var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar)

setCommand(button, refreshMenuBarCommand)