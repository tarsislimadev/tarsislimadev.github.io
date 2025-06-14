import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { KeyValuePairComponent } from '../../assets/js/components/key.value.pair.component.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'
import { MessagesComponent } from './components/messages.component.js'
import { FormComponent } from './components/form.component.js'
import { MessageModel } from './models/message.model.js'
import * as str from '../../assets/js/utils/str.js'

class ResponseMessageModel extends MessageModel {
  type = 'response'

  json = {}

  constructor(json = {}) {
    super()
    this.json = json
  }
}

class ResponseComponent extends HTML {
  model = new MessageModel()

  state = {
    datetime: Date.now(),
  }

  constructor(model = new MessageModel()) {
    super()
    this.model = model
  }

  onCreate() {
    super.onCreate()
    this.append(new KeyValuePairComponent({ key: 'ldh', value: this.model.json.ldhName }))
    this.append(new KeyValuePairComponent({ key: 'type', value: this.model.json.entities[0].publicIds[0].type }))
    this.append(new KeyValuePairComponent({ key: 'identifier', value: this.model.json.entities[0].publicIds[0].identifier }))
    this.append(new TextComponent({ text: this.state.datetime, title: str.datetime2str(this.state.datetime) }))
  }
}

export class Page extends PageComponent {
  form = new FormComponent()
  messages = new MessagesComponent()

  onCreate() {
    super.onCreate()
    this.append(this.getHeader())
    this.append(this.getBody())
  }

  getHeader() {
    return new LinkComponent({ text: 'RDAP', href: '?' })
  }

  getBody() {
    return new TwoColumnsComponent({
      html1: this.getForm(),
      html2: this.getMessages(),
    })
  }

  getForm() {
    this.form.addEventListener('submit', ({ value }) => this.onFormSubmit(value))
    return this.form
  }

  onFormSubmit({ tld } = {}) {
    console.log('on form submit', tld)

    fetch(`https://rdap.org/domain/${tld}`).then((res) => res.json())
      .then((json) => this.addMessage(new ResponseMessageModel(json)))
      .catch((err) => this.addMessage(new MessageModel(err.message)))
  }

  addMessage(message = new MessageModel()) {
    this.messages.append(this.parseMessage(message))
  }

  parseMessage(message = new MessageModel()) {
    if (message.type == 'response') return new ResponseComponent(message)
    return new TextComponent({ text: JSON.stringify(message.toJSON()) })
  }

  getMessages() {
    this.messages.setStyle('text-align', 'right')
    return this.messages
  }
}
