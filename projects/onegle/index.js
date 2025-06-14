import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { Peer } from '../../assets/js/libs/peerjs/index.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'
import { VideoComponent } from './components/video.component.js'

export class Page extends PageComponent {
  title = new HTML()
  login_button = new ButtonComponent({ text: 'facebook login', onclick: () => this.onFacebookLoginButtonClick() })
  user_media_button = new ButtonComponent({ text: 'user media', onclick: () => this.onUserMedia() })
  peer_button = new ButtonComponent({ text: 'peer', onclick: () => this.onPeerButtonClick() })
  video = new VideoComponent()

  state = {
    peer: {
      conn: new Peer(),
      id: this.getIdByUrl(),
    },
    facebook: {
      id: '',
    },
    user_media: {
      stream: null,
    }
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(this.getTitle())
    this.append(this.getUserMediaButon())
    this.append(this.getPeerButton())
    this.append(this.getVideo())
  }

  getTitle() {
    this.setTitle()
    return this.title
  }

  setTitle(title = '', href = '') {
    this.title.clear()
    if (href != '') {
      this.title.append(new LinkComponent({ text: 'onegle ' + title, href }))
    } else {
      this.title.append(new TextComponent({ text: 'onegle ' + title }))
    }
  }

  setEvents() {
    this.setFacebookEvents()
    this.setPeerEvents()
  }

  setFacebookEvents() {
    this.addEventListener('fb.load', () => this.onFacebookLoad())
  }

  setPeerEvents() {
    this.state.peer.conn.on('open', (data) => this.onPeerOpen(data))
    this.state.peer.conn.on('connection', (data) => this.onPeerConnection(data))
    this.state.peer.conn.on('call', (data) => this.onPeerCall(data))
    this.state.peer.conn.on('close', (data) => this.onPeerClose(data))
    this.state.peer.conn.on('disconnected', (data) => this.onPeerDisconnected(data))
    this.state.peer.conn.on('error', (data) => this.onPeerError(data))
  }

  onPeerOpen(data) {
    console.log('on peer Open', { data })
  }

  onPeerConnection(data) {
    console.log('on peer Connection', { data })
  }

  onPeerCall(data) {
    console.log('on peer Call', { data })
  }

  onPeerClose(data) {
    console.log('on peer Close', { data })
  }

  onPeerDisconnected(data) {
    console.log('on peer Disconnected', { data })
  }

  onPeerError(data) {
    console.log('on peer Error', { data })
  }

  onFacebookLoad() {
    this.append(this.getFacebookLoginButton())
  }

  getFacebookLoginButton() {
    return this.login_button
  }

  onFacebookLoginButtonClick() {
    FB.login((response) => this.onFacebookLogin(response), { scope: 'public_profile,email' });
  }

  onFacebookLogin(response) {
    console.log('on facebook login', { response })
    this.setTitle(response.authResponse.userID, this.getPageUrl())
  }

  getPageUrl() {
    const url = new URL(window.location)
    url.pathname += '?id=' + this.state.peer.conn._id
    return url.toString().replace('%3F', '?')
  }

  onUserMedia() {
    console.log('on user media')
    navigator.getUserMedia({ audio: true, video: true }, (stream) => {
      this.video.srcObject(this.state.user_media.stream = stream)
      this.video.play()
    })
  }

  getUserMediaButon() {
    return this.user_media_button
  }

  getVideo() {
    return this.video
  }

  getPeerButton() {
    return this.peer_button
  }

  onPeerButtonClick() {
    console.log('on peer Button Click')
    this.state.peer.conn.connect(this.getIdByUrl())
  }

  getIdByUrl() {
    const url = new URL(window.location)
    return url.searchParams.get('id')
  }

}
