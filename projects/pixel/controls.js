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
  }

  constructor() {
    super()
    this.state.conn = this.peer.connect(this.state.peerId)
    this.setEvents()
  }

  setEvents() {
    this.peer.on('open', (id) => {
      const text = new HTML()
      text.setText('My peer ID is: ' + id)
      this.el.peerIdDisplay.append(text)
    })
    this.state.conn?.on('open', (id) => {
      const roomId = new HTML()
      roomId.setText('Room peer ID is: ' + id)
      this.el.peerIdDisplay.append(roomId)
    })
    this.state.conn?.on('data', (data) => {
      console.log('Received data:', data)
    })
    this.state.conn?.on('error', (err) => {
      console.error('Connection error:', err)
    })
  }

  onCreate() {
    this.setText('Pixel Room')
    this.append(this.el.peerIdDisplay)
  }

  getPeerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('roomId') || undefined
  }
}
