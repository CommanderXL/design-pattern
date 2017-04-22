class PlayerMediator {
  constructor () {
    this.players = {}
    this.team = {}
  }

  addPlayer (player) {
    const color = player.color
    this.team[color] = this.team[color] || []
    this.team[color].push(player)
  }

  removePlayer (player) {
    const color = player.color
    this.team[color] = this.team[color] || []
    this.team[color].forEach((item, index) => {
      if (item === player) {
        this.team[color].splice(index, 1)
      }
    })
  }

  changeTeam (player, newTeamColor) {
    this.removePlayer(player)
    this.player.color = newTeamColor
    this.addPlayer(player)
  }

  playerDead () {

  }
}