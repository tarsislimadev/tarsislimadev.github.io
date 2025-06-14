import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'
import { MessagesComponent } from './components/messages.component.js'
import { FormComponent } from './components/form.component.js'
import { InputSocketMessageModel } from '../../assets/js/models/input.socket.message.model.js'
import { OutputSocketMessageModel } from '../../assets/js/models/output.socket.message.model.js'
import { ErrorSocketMessageModel } from '../../assets/js/models/error.socket.message.model.js'
import { CloseSocketMessageModel } from '../../assets/js/models/close.socket.message.model.js'
import { OpenSocketMessageModel } from '../../assets/js/models/open.socket.message.model.js'
import { MessageModel } from '../../assets/js/models/message.model.js'

import { ApplicationWebSocket } from '../../assets/js/utils/socket.js'

export class Page extends PageComponent {
  state = {
    socket: this.createSocketConnection(),
  }

  form = new FormComponent()
  messages = new MessagesComponent()

  createSocketConnection() {
    return new ApplicationWebSocket('wss://api.foxbit.com.br/', {
      onopen: (data) => this.onSocketOpen(data),
      onmessage: (data) => this.onSocketMessage(data),
      onerror: (data) => this.onSocketError(data),
      onclose: (data) => this.onSocketClose(data),
    })
  }

  onSocketOpen(data) {
    this.appendMessage(new OpenSocketMessageModel())
  }

  onSocketMessage({ data } = {}) {
    const { m: MessageType, i: SequenceNumber, n: Endpoint, o: Payload, } = JSON.parse(data)
    this.appendMessage(new OutputSocketMessageModel(Endpoint, JSON.parse(Payload), { MessageType, SequenceNumber }))
  }

  onSocketError(data) {
    this.appendMessage(new ErrorSocketMessageModel(data))
  }

  onSocketClose(data) {
    this.appendMessage(new CloseSocketMessageModel())
    this.state.socket = this.createSocketConnection()
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(new LinkComponent({ text: 'foxbit', href: 'https://docs.foxbit.com.br/ws/v2/' }))
    this.append(new TwoColumnsComponent({ html1: this.getFormComponent(), html2: this.getMessagesComponent() }))
  }

  setEvents() {
    this.form.addEventListener('submit', ({ value: data }) => this.onFormSubmit(data))
  }

  onFormSubmit(data) {
    const payload = Array.from(data).reduce((p, [key, value]) => ({ ...p, [key]: value }), {})
    const message = new InputSocketMessageModel(data.name, payload)
    this.state.socket.send(JSON.stringify(message))
    this.appendMessage(message)
  }

  getFormComponent() {
    return this.form
  }

  getMessagesComponent() {
    return this.messages
  }

  appendMessage(message = new MessageModel()) {
    this.messages.dispatch('message', message)
  }
}
