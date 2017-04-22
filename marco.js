function Marco () {
  this.method = ''
  this.cmdList = []
}

Marco.prototype.add = function (cmd) {
  this.cmdList.push(cmd)
}

Marco.prototype.execute = function (method) {
  for (let i = 0; i < this.cmdList.length; i++) {
    let cmd = this.cmdList[i][method]
    cmd && cmd()
  }
}

console.log(window.throttle)