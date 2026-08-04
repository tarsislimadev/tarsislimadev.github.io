import { HTML, nLink } from '../libs/afrontend/index.js'
import { Peer } from "../libs/peerjs/index.js";

export class Page extends HTML {
  peer = new Peer()

  state = {
    peerId: this.getPeerIdFromUrl(),
    conn: null,
  }

  el = {
    peerIdDisplay: new HTML(),
    connectButton: new nButton(),
  }

  constructor() {
    super()
  }

  onCreate() {
    this.setText('Pixel Room')
    this.append(this.el.peerIdDisplay)
    this.state.conn = this.peer.connect(this.state.peerId)
    this.setEvents()
  }

  getPeerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('roomId') || undefined
  }
}
