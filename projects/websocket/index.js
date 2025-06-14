import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { HeaderComponent } from './components/header.component.js'
import { ContentComponent } from './components/content.component.js'
import { FooterComponent } from './components/footer.component.js'

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
    this.content.addMessage('open', '')
  }

  onConnectMessage({ data } = {}) {
    this.addMessage(data.toString())
  }

  onConnectError(data) {
    this.content.addMessage('error', data.message.toString())
  }

  onConnectClose(data) {
    this.content.addMessage('close', '')
  }

  getContentComponent() {
    return this.content
  }

  getFooterComponent() {
    this.footer.addEventListener('send', (ev) => this.onSend(ev))
    return this.footer
  }

  onSend({ value: data } = {}) {
    this.addMessage(data.toString())
    this.state.socket.send(data)
  }

  addMessage(message) {
    this.content.addMessage('message', message.toString())
  }

}
