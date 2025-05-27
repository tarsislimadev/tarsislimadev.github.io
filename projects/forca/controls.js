import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { Peer } from '../../assets/js/libs/peerjs/index.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { getURLSearchParam } from '../../assets/js/utils/url.js'

export class Page extends PageComponent {
  state = {
    peer: new Peer(),
    conn: null,
    events: {},
  }

  onCreate() {
    super.onCreate()
    this.setPeerEvents()
    this.append(new TextComponent({ text: 'forca ' + this.getId() }))
    this.append(new TwoColumnsComponent({
      html1: this.createButton('a'),
      html2: this.createButton('b'),
      widths: ['50%', '50%'],
    }))
    this.append(new TwoColumnsComponent({
      html1: this.createButton('c'),
      html2: this.createButton('d'),
      widths: ['50%', '50%'],
    }))
    this.append(new TwoColumnsComponent({
      html1: this.createButton('e'),
      html2: this.createButton('f'),
      widths: ['50%', '50%'],
    }))
  }

  setPeerEvents() {
    const id = this.getId()
    this.state.peer.on('open', () => {
      console.log('peer open')
      const conn = this.state.peer.connect(id)
      this.addEventListener('message', ({ value: message }) => conn.send({ message }))
      conn.on('open', () => console.log('conn open', conn))
      conn.on('close', () => console.log('conn close', conn))
      conn.on('error', (err) => console.log('conn error', err, conn))
      console.log({ id, conn })
    })
  }

  getId() {
    return getURLSearchParam('id')
  }

  createButton(text) {
    const button = new HTML()
    button.append(new TextComponent({ text }))
    button.addEventListener('click', () => this.dispatch('message', { text }))
    button.setStyle('text-align', 'center')
    button.setStyle('padding', '1rem')
    return button
  }
}
