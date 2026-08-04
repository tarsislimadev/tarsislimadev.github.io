import { HTML } from '../libs/afrontend/index.js'
import { Peer } from "../libs/peerjs/index.js";

export class Page extends HTML {
  peer = new Peer()

  el = {
    peerIdDisplay: new HTML(),
  }

  constructor() {
    super()
    this.peer.on('open', (id) => {
      this.el.peerIdDisplay.setText('My peer ID is: ' + id)
    })
  }

  onCreate() {
    this.setText('Pixel Room')
    this.append(this.el.peerIdDisplay)
  }
}
