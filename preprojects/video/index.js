import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { Peer } from '../../assets/js/libs/peerjs/index.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { VideoComponent } from './components/video.component.js'

export class Page extends PageComponent {
  media_id = new TextComponent({ text: 'media id: ' })
  media_button = new ButtonComponent({ text: 'user media', onclick: () => this.onUserMediaButtonClick() })
  media = new VideoComponent()
  call_id = new InputComponent({ label: 'call id' })
  call_button = new ButtonComponent({ text: 'call' })
  call = new VideoComponent()
  error = new HTML()

  state = {
    media: null,
    call: null,
    peer: new Peer(),
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(this.getVideosComponent())
    this.append(this.getErrorComponent())
  }

  setEvents() {
    // peer
    this.state.peer.on('open', (data) => this.onPeerOpen(data))
    this.state.peer.on('call', (data) => this.onPeerCall(data))
    // call_button
    this.call_button.on('click', () => this.onCallButtonClick())
  }

  onPeerOpen(id) {
    console.log('on peer open', { data: id })
    this.media_id.setText('media id: ' + id)
  }

  onPeerCall(call) {
    console.log('on peer call', { call })
    call.answer(this.state.media)
    call.on('stream', (stream) => {
      console.log('on call stream', { stream })
      this.call.srcObject(this.state.call = stream)
      this.call.play()
    })
  }

  onUserMediaButtonClick() {
    this.getUserMedia()
    navigator.getUserMedia({ audio: true, video: true }, (stream) => {
      console.log('on user media', { stream })
      this.media.srcObject(this.state.media = stream)
      this.media.play()
    }, (error) => {
      this.error.clear()
      this.error.append(new TextComponent({ text: error.toString() }))
    })
  }

  getUserMedia() {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
  }

  getVideosComponent() {
    return new TwoColumnsComponent({
      html1: this.getLeft(),
      html2: this.getRight(),
      widths: ['48%', '48%'],
    })
  }

  getLeft() {
    const html = new HTML()
    html.append(this.media_id)
    html.append(this.media_button)
    html.append(this.media)
    return html
  }

  getRight() {
    const html = new HTML()
    html.append(this.call_id)
    html.append(this.call_button)
    html.append(this.call)
    return html
  }

  getErrorComponent() {
    return this.error
  }

  onCallButtonClick(id = this.call_id.getValue(), stream = this.state.media) {
    console.log('on Call Button Click', { id })
    this.state.peer.call(id, stream)
  }
}
