import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { HeaderComponent } from './components/header.component.js'
import { ContentComponent } from './components/content.component.js'
import { FooterComponent } from './components/footer.component.js'
import { dispatchWindowEvent } from '../../assets/js/utils/window.js'
import { SocketMessageModel } from './models/socket.message.model.js'
import { OpenSocketMessageModel } from './models/open.socket.message.model.js'
import { CloseSocketMessageModel } from './models/close.socket.message.model.js'
import { ErrorSocketMessageModel } from './models/error.socket.message.model.js'

export class Page extends HTML {
  header = new HeaderComponent()
  content = new ContentComponent()
  footer = new FooterComponent()

  state = {
    socket: null,
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeaderComponent())
    this.append(this.getFooterComponent())
    this.append(this.getContentComponent())
  }

  getHeaderComponent() {
    this.header.addEventListener('connect', (ev) => this.onConnect(ev))
    return this.header
  }

  onConnect(ev) {
    this.state.socket = new WebSocket(ev.value)
    this.state.socket.addEventListener('open', (data) => this.onConnectOpen(data))
    this.state.socket.addEventListener('message', (data) => this.onConnectMessage(data))
    this.state.socket.addEventListener('error', (data) => this.onConnectError(data))
    this.state.socket.addEventListener('close', (data) => this.onConnectClose(data))
  }

  onConnectOpen(data) {
    dispatchWindowEvent('message', new OpenSocketMessageModel(data))
  }

  onConnectMessage({ data } = {}) {
    dispatchWindowEvent('message', new SocketMessageModel(data.toString()))
  }

  onConnectError(data) {
    dispatchWindowEvent('message', new ErrorSocketMessageModel(data))
  }

  onConnectClose(data) {
    dispatchWindowEvent('message', new CloseSocketMessageModel(data))
  }

  getContentComponent() { return this.content }

  getFooterComponent() {
    this.footer.addEventListener('send', (ev) => this.onSend(ev))
    return this.footer
  }

  onSend({ value: data } = {}) {
    dispatchWindowEvent('message', new SocketMessageModel(data.toString()))
    this.state.socket.send(data)
  }
}
