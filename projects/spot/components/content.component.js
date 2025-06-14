import { HTML, nFlex } from '../../../assets/js/libs/afrontend/index.js'
import { FormComponent } from './form.component.js'
import { MessagesComponent } from './messages.component.js'

import { PublicBitgetWebSocket } from '../../../assets/js/apis/bitget.js'

export class ContentComponent extends HTML {
  form = new FormComponent()
  messages = new MessagesComponent()

  state = {
    socket: this.getWebSocket()
  }

  getWebSocket() {
    return PublicBitgetWebSocket({
      onopen: (data) => this.onSocketOpen(data),
      onmessage: (data) => this.onSocketMessage(data),
      onerror: (data) => this.onSocketError(data),
      onclose: (data) => this.onSocketClose(data),
    })
  }

  onSocketOpen(data) {
    console.log('onSocketOpen', { data })
  }

  onSocketMessage(data) {
    console.log('onSocketMessage', { data })
  }

  onSocketError(data) {
    console.log('onSocketError', { data })
  }

  onSocketClose(data) {
    console.log('onSocketClose', { data })
  }

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getFormComponent())
    flex.append(this.getMessagesComponent())
    return flex
  }

  getFormComponent() {
    this.form.addEventListener('start', (ev) => this.onStart(ev))
    this.form.addEventListener('change', (ev) => this.onChange(ev))
    return this.form
  }

  onStart(ev) {
    const message = { "op": "subscribe", "args": [{ "instType": "SPOT", "channel": "candle1m", "instId": ev.value }] }
    this.state.socket.send(JSON.stringify(message))
    this.messages.dispatch('message', message)
  }

  onChange(ev) {
    console.log('onChange', ev)
  }

  getMessagesComponent() {
    return this.messages
  }
}
