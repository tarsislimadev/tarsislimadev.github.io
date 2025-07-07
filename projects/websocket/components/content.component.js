import { HTML, nFlex, nInput } from '../../../assets/js/libs/afrontend/index.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'
import * as str from '../../../assets/js/utils/str.js'
import { MessageModel } from '../models/message.model.js'

class nCheckbox extends nInput {
  getName() { return 'checkbox' }

  onCreate() {
    super.onCreate()
    this.setAttr('type', 'checkbox')
    this.setAttr('id', 'checkbox-' + Date.now())
  }
}

export class ContentComponent extends HTML {
  messages = new HTML()

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.setStyles()
    this.append(this.getMessagesComponent())
  }

  setEvents() {
    window.addEventListener('message', ({ value }) => this.addMessage(value))
  }

  setStyles() {
    this.setStyle('padding', '1rem')
  }

  getMessagesComponent() {
    return this.messages
  }

  addMessage(message = new MessageModel()) {
    this.messages.prepend(this.createMessageCard(message))
  }

  createMessageCard(message) {
    const card = new HTML()
    const head = new nFlex()
    head.append(new TextComponent({ text: message.heads[0] }))
    head.append(new TextComponent({ text: message.heads[1] }))
    card.append(head)
    card.append(new TextComponent({ text: message.body?.toString() }))
    const foot = new nFlex()
    foot.append(new TextComponent({ text: message.foots[0], title: str.timestamp2str(message.foots[0]) }))
    foot.append(new TextComponent({ text: message.foots[1] }))
    card.append(foot)
    return card
  }
}
