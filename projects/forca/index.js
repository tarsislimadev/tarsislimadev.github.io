import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { createJustNewPeer } from '../../assets/js/utils/peer.js'
import { createEvent } from '../../assets/js/utils/events.js'

export class Page extends PageComponent {
  state = {
    peer: createJustNewPeer('forca'),
    ee: new EventTarget(),
  }

  game = new HTML()

  getBodyComponent() {
    const html = new HTML()
    html.append(new TextComponent({ text: 'forca' }))
    html.append(this.getGameComponent())
    this.setEvents()

    return html
  }

  getGameComponent() {
    this.state.ee.addEventListener(
      'text',
      ({ value: text }) => console.log('text', text)
    )
    return this.game
  }

  setEvents() {
    this.state.peer.on('open', () => this.state.peer.showQRCode())

    this.state.peer.on('connection', (conn) => {
      conn.on('data', ({ message: { text } }) => {
        this.game.append(new TextComponent({ text }))
      })
    })
  }
}
