import { HTML, nLink } from '../libs/afrontend/index.js'
import { Peer } from "../libs/peerjs/index.js";

export class Page extends HTML {
  peer = new Peer()

  el = {
    peerIdDisplay: new HTML(),
  }

  constructor() {
    super()
    this.setEvents()
  }

  setEvents() {
    this.peer.on('open', (id) => {
      const text = new HTML()
      text.setText('My peer ID is: ')
      const link = new nLink()
      link.setText(id)
      link.setAttr('href', `./controls.html?roomId=${id}`)
      // 
      this.el.peerIdDisplay.clear()
      this.el.peerIdDisplay.append(text)
      this.el.peerIdDisplay.append(link)
    })
  }

  onCreate() {
    this.setText('Pixel Room')
    this.append(this.el.peerIdDisplay)
  }
}
