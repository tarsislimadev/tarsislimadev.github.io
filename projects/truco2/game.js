import { HTML, nImage, nLink } from '../../assets/js/libs/afrontend/index.js'
import { createNewPeer } from '../../assets/js/utils/peer.js'
import { getParams } from '../../assets/js/utils/url.js'
import { qrcode } from '../../assets/js/utils/functions.js'

export class Page extends HTML {
  peer = null
  players = {
    _1: null,
    _2: null,
    _3: null,
    _4: null,
  }

  onCreate() {
    super.onCreate()
    const id = this.id = this.getId()
    this.peer = createNewPeer('truco2', { id })
    this.peer.on('connection', (conn) => console.log('connection', conn))
    Array.from(Array(4)).map((_, ix) => this.createPlayer(id, ix + 1))
  }

  getId() {
    const { id } = getParams()
    return id
  }

  createPlayer(game_id, player_id) {
    this.append(this.createPlayerLink(this.createUrl(game_id, player_id)))
  }

  createUrl(game_id, player_id) {
    const url = new URL(window.location)
    url.pathname = '/projects/truco2/controls.html'
    url.searchParams.set('id', game_id + '--' + player_id)
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
}
