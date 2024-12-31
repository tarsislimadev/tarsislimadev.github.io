import { HTML } from '../../../assets/js/libs/afrontend/index.js'
import { MessageCardComponent } from '../../../assets/js/components/message.card.component.js'
import { MessageModel } from '../../../assets/js/models/message.model.js'

import * as inputs from './input.messages.component.js'
import * as outputs from './output.messages.component.js'

export class MessagesComponent extends HTML {
  children = {
    messages: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(this.getMessagesComponent())
  }

  setEvents() {
    this.addEventListener('message', ({ value: data }) => this.onMessage(data))
  }

  onMessage(message = new MessageModel()) {
    this.children.messages.append(this.parseMessageComponent(message))
  }

  parseMessageComponent(message = new MessageModel()) {
    switch (message.Side) {
      case 'input': return this.parseInputMessageComponent(message)
      case 'output': return this.parseOutputMessageComponent(message)
    }

    return new MessageCardComponent(message)
  }

  parseInputMessageComponent(message = new MessageModel()) {
    switch (message.Endpoint) {
      case 'klines': return new inputs.KlinesMessageCardComponent(message)
    }

    return new MessageCardComponent(message)
  }

  parseOutputMessageComponent(message = new MessageModel()) {
    switch (message.Endpoint) {
      case 'klines': return new outputs.KlinesMessageCardComponent(message)
    }

    return new MessageCardComponent(message)
  }

  getMessagesComponent() {
    return this.children.messages
  }
}
