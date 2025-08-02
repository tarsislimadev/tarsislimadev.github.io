import { PageComponent } from '../../assets/js/components/page.component.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { FormComponent } from './components/form.component.js'
import { MessagesComponent } from './components/messages.component.js'

import { BinanaceWebSocket } from '../../assets/js/apis/websocket/binance/v3.js'

import { dispatchWindowEvent } from '../../assets/js/utils/window.js'

import { MessageModel } from '../../assets/js/models/message.model.js'
import { SocketOpenMessageModel } from './models/socket.open.message.model.js'
import { SocketErrorMessageModel } from './models/socket.error.message.model.js'
import { SocketCloseMessageModel } from './models/socket.close.message.model.js'

export class Page extends PageComponent {
  socket = this.createWebSocketConnection()

  form = new FormComponent()
  messages = new MessagesComponent()

  onCreate() {
    super.onCreate()
    this.body.append(new TwoColumnsComponent({
      html1: this.form,
      html2: this.messages,
    }))
    this.setEvents()
  }

  createWebSocketConnection() {
    return new BinanaceWebSocket({
      onopen: (...data) => this.onSocketOpen(...data),
      onmessage: (...data) => this.onSocketMessage(...data),
      onerror: (...data) => this.onSocketError(...data),
      onclose: (...data) => this.onSocketClose(...data),
    })
  }

  onSocketOpen() {
    dispatchWindowEvent('message', new SocketOpenMessageModel())
  }

  onSocketMessage(...data) {
    console.log('socket message', ...data)
    dispatchWindowEvent('message', new MessageModel('SocketMessage', {}))
  }

  onSocketError(err) {
    console.error(err)
    dispatchWindowEvent('message', new SocketErrorMessageModel(err))
    this.socket = this.createWebSocketConnection()
  }

  onSocketClose() {
    dispatchWindowEvent('message', new SocketCloseMessageModel())
  }

  setEvents() {
    window.addEventListener('submit', ({ value: { name, values } }) => {
      console.log('submit', { name, values })
      this.socket.send(JSON.stringify({
        'method': 'SUBSCRIBE',
        'params': [
          `${values[0][1]}@aggTrade`,
          `${values[0][1]}@depth`
        ],
        'id': Date.now()
      }))
    })
  }
}
