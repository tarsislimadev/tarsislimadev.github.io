import { HTML } from '../../../assets/js/libs/afrontend/index.js'

export class MessagesComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.setEvents()
  }

  setEvents() {
    this.addEventListener('message', (ev) => this.onMessage(ev))
  }

  onMessage(ev) {
    console.log('onMessage', ev)
  }
}
