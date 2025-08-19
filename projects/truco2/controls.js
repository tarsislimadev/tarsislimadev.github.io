import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { Peer } from '../../assets/js/libs/peerjs/index.js'

export class Page extends HTML {
  peer = new Peer() // (window.location.search.split('=').at(1))
  conn = null
  game_id = null
  player_id = null

  constructor() {
    super()
    const url = new URL(window.location)
    const [game_id, player_id] = url.searchParams.get('id')?.split('_') || []
    this.game_id = game_id
    this.player_id = player_id
  }

  onCreate() {
    super.onCreate()
    this.createConnection()
    this.setText(`game: ${this.game_id}; player: ${this.player_id};`)
  }

  createConnection() {
    this.peer.on('open', () => {
      this.conn = this.peer.connect(this.game_id)
      this.conn.on('open', () => this.onPlayerConnected())
    })
  }

  onPlayerConnected() {
    this.setText(`game: ${this.game_id}; player: ${this.player_id}; peer: ${this.peer.id}; conn: ${this.conn.connectionId}`)
    this.sendMessage({ open: true })
  }

  sendMessage(message = {}) {
    const json = {
      header: this.getMessageHeader(),
      body: message
    }
    console.log('send message', { json })
    this.conn.send(JSON.stringify(json))
  }

  getMessageHeader() {
    return {
      datetime: Date.now(),
      game_id: this.game_id,
      player_id: this.player_id,
      peer_id: this.peer.id,
      conn_id: this.conn.connectionId,
    }
  }
}
