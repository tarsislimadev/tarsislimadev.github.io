import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'
import { MessagesComponent } from './components/messages.component.js'
import { FormComponent } from './components/form.component.js'

import { InputSocketMessageModel } from './models/input.socket.message.model.js'
import { OutputSocketMessageModel } from '../../assets/js/models/output.socket.message.model.js'
import { ErrorSocketMessageModel } from '../../assets/js/models/error.socket.message.model.js'
import { CloseSocketMessageModel } from '../../assets/js/models/close.socket.message.model.js'
import { OpenSocketMessageModel } from '../../assets/js/models/open.socket.message.model.js'
import { MessageModel } from '../../assets/js/models/message.model.js'

import { ApplicationWebSocket } from '../../assets/js/utils/socket.js'
import { dispatchWindowEvent } from '../../assets/js/utils/window.js'

import { websocket } from '../../assets/js/apis/binance.js'

import BINANCE from '../../assets/js/config/binance/index.js'

export class Page extends PageComponent {
  socket = this.createSocketConnection()
  messages_list = []

  createSocketConnection() {
    return new ApplicationWebSocket(websocket.url, {
      onopen: (data) => this.onSocketOpen(data),
      onmessage: (data) => this.onSocketMessage(data),
      onerror: (data) => this.onSocketError(data),
      onclose: (data) => this.onSocketClose(data),
    })
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
    return this.messages_list.find((m = new MessageModel()) => m.Id == id)
  }

  onSocketError(data) {
    this.appendMessage(new ErrorSocketMessageModel(data))
  }

  onSocketClose(data) {
    this.appendMessage(new CloseSocketMessageModel(data))
    if (this.canOpenSocketConnection()) this.socket = this.createSocketConnection()
  }

  canOpenSocketConnection() {
    return this.messages_list.filter((m = new MessageModel()) => (m.Side == 'socket' && ['close', 'error'].indexOf(m.Endpoint))).length <= 3
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.loadCharts()
    this.append(new LinkComponent({ text: BINANCE.websocket.name, href: BINANCE.websocket.docs }))
    this.append(new TwoColumnsComponent({
      html1: new FormComponent(),
      html2: new MessagesComponent(),
    }))
  }

  loadCharts() {
    google.charts.load('current', { 'packages': ['corechart'] })
    google.charts.setOnLoadCallback(() => this.appendMessage(new MessageModel('charts', {})))
  }

  setEvents() {
    window.addEventListener('submit', ({ value: data }) => this.onFormSubmit(data))
  }

  onFormSubmit(data) {
    const payload = Array.from(data.values).reduce((p, [key, value]) => ({ ...p, [key]: value }), {})
    const message = new InputSocketMessageModel(data.name, payload)
    this.socket.send(JSON.stringify(message))
    this.appendMessage(message)
  }

  appendMessage(message = new MessageModel()) {
    this.messages_list.push(message)
    dispatchWindowEvent('message', message)
  }
}
