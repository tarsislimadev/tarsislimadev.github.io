import { HTML, nImage, nLink } from '../../assets/js/libs/afrontend/index.js'

import { TextElement } from '../../assets/js/elements/text.element.js'

import { createNewPeer } from '../../assets/js/utils/peer.js'
import { qrcode } from '../../assets/js/utils/functions.js'

class PlayerComponent extends HTML {
  game_id = null
  player_id = null
  conn = null

  qrcode = new HTML()

  constructor(game_id, player_id) {
    super()
    this.game_id = game_id
    this.player_id = player_id
  }

  onCreate() {
    this.append(new TextElement({
      text: 'player ' + (this.player_id),
      styles: { 'text-align': 'center' }
    }))
    this.qrcode.append(this.createPlayerLink(this.createUrl()))
    this.append(this.qrcode)
  }

  createUrl() {
    const url = new URL(window.location)
    url.pathname = '/projects/truco2/controls.html'
    url.searchParams.set('id', this.game_id + '_' + this.player_id)
    return url.toString()
  }

  createPlayerLink(url) {
    const link = new nLink()
    link.href(url)
    link.append(this.createPlayerQrCode(url))
    return link
  }

  createPlayerQrCode(url) {
    const image = new nImage()
    image.src(qrcode(url))
    image.setContainerStyle('width', '150px')
    image.setContainerStyle('height', '150px')
    image.setContainerStyle('margin', '1rem')
    return image
  }

  setConnection(conn) {
    this.conn = conn
    this.qrcode.clear()
    this.qrcode.setText('player ' + this.player_id + ' gets connection ' + conn.connectionId)
  }
}

export class Page extends HTML {
  game_id = null
  peer = null
  players = []

  constructor() {
    super()
    const url = new URL(window.location)
    this.game_id = url.searchParams.get('id')
  }

  onCreate() {
    this.peer = createNewPeer('truco2', { id: this.game_id })
    this.peer.on('connection', (conn) => this.onConnection(conn))
    Array.from(Array(4)).map((_, player_id) => {
      const player = new PlayerComponent(this.game_id, player_id)
      this.players.push(player)
    })
    this.updatePlayers()
  }

  onConnection(conn) {
    conn.on('data', (data) => {
      const message = JSON.parse(data)
      Array.from(this.players).map((p) => {
        const is_player_id = p.player_id == message.header.player_id
        const is_open = message.body?.open == true
        if (is_player_id && is_open) p.setConnection(conn)
      })
    })
  }

  updatePlayers() {
    this.clear()
    this.players.map((p) => this.append(p))
  }
}
