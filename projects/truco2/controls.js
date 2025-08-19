import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { Peer } from '../../assets/js/libs/peerjs/index.js'

export class Page extends HTML {
  peer = new Peer()
  conn = null

  onCreate() {
    super.onCreate()
    const { game_id, player_id } = this.getParams()
    this.createConnection(game_id, player_id)
    this.setText(`game: ${game_id}; player: ${player_id};`)
  }

  createConnection(game_id) {
    this.peer.on('open', () => {
      this.conn = this.peer.connect(game_id)
      this.conn.on('open', () => this.onPlayerConnected())
    })
  }

  onPlayerConnected() {
    const { game_id, player_id } = this.getParams()
    this.setText(`game: ${game_id}; player: ${player_id}; peer: ${this.peer.id}; conn: ${this.conn.connectionId}`)
  }

  getParams() {
    const url = new URL(window.location)
    const [game_id = '', player_id = ''] = url.searchParams.get('id')?.split('--') || []
    return { game_id, player_id }
  }
}
