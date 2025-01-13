import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'
import { MessagesComponent } from './components/messages.component.js'
import { FormComponent } from './components/form.component.js'
import { InputSocketMessageModel } from './models/input.socket.message.model.js'
import { OutputSocketMessageModel } from '../../assets/js/models/output.socket.message.model.js'
import { ErrorSocketMessageModel } from '../../assets/js/models/error.socket.message.model.js'
import { CloseSocketMessageModel } from '../../assets/js/models/close.socket.message.model.js'
import { OpenSocketMessageModel } from '../../assets/js/models/open.socket.message.model.js'
import { MessageModel } from '../../assets/js/models/message.model.js'
import { BinanceWebSocket } from '../../assets/js/apis/binance.js'

export class Page extends PaddingComponent {
  state = {
    socket: this.createSocketConnection(),
    messages: [],
  }

  children = {
    form: new FormComponent(),
    messages: new MessagesComponent(),
  }

  createSocketConnection() {
    const socket = new BinanceWebSocket()
    socket.addEventListener('open', (data) => this.onSocketOpen(data))
    socket.addEventListener('message', (data) => this.onSocketMessage(data))
    socket.addEventListener('error', (data) => this.onSocketError(data))
    socket.addEventListener('close', (data) => this.onSocketClose(data))
    return socket
  }

  onSocketOpen(data) {
    this.appendMessage(new OpenSocketMessageModel(data))
  }

  onSocketMessage({ data } = {}) {
    const { id, result } = JSON.parse(data)
    const Endpoint = this.getMessageById(id)?.Endpoint
    this.appendMessage(new OutputSocketMessageModel(Endpoint, result))
  }

  getMessageById(id) {
    return this.state.messages.find((m = new MessageModel()) => m.Id == id)
  }

  onSocketError(data) {
    this.appendMessage(new ErrorSocketMessageModel(data))
  }

  onSocketClose(data) {
    this.appendMessage(new CloseSocketMessageModel(data))
    if (this.canOpenSocketConnection()) this.state.socket = this.createSocketConnection()
  }

  canOpenSocketConnection() {
    return this.state.messages.filter((m = new MessageModel()) => (m.Side == 'socket' && ['close', 'error'].indexOf(m.Endpoint))).length <= 3
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(new LinkComponent({ text: BINANCE.websocket.name, href: BINANCE.websocket.docs }))
    this.append(new TwoColumnsComponent({ html1: this.getFormComponent(), html2: this.getMessagesComponent() }))
  }

  setEvents() {
    this.children.form.addEventListener('submit', ({ value: data }) => this.onFormSubmit(data))
  }

  onFormSubmit(data) {
    const payload = Array.from(data.values).reduce((p, [key, value]) => ({ ...p, [key]: value }), {})
    const message = new InputSocketMessageModel(data.name, payload)
    this.state.socket.send(JSON.stringify(message))
    this.appendMessage(message)
  }

  getFormComponent() {
    return this.children.form
  }

  getMessagesComponent() {
    return this.children.messages
  }

  appendMessage(message = new MessageModel()) {
    this.state.messages.push(message)
    this.children.messages.dispatch('message', message)
  }
}
