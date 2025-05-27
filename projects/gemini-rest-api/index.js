import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { ImageLinkComponent } from '../../assets/js/components/image.link.component.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { MessageModel } from './models/message.model.js'

export class Page extends PageComponent {
  children = {
    ip: new HTML(),
    key_input: new InputComponent({ label: 'key', type: 'password' }),
    text_input: new InputComponent({ label: 'text' }),
    messages: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeader())
    this.append(this.getBody())
  }

  getHeader() {
    return new TwoColumnsComponent({
      html1: new ImageLinkComponent({ src: './logo.png', href: 'https://ai.google.dev/gemini-api/docs/quickstart?lang=rest', text: 'Gemini REST API' }),
      html2: new HTML(),
    })
  }

  getBody() {
    return new TwoColumnsComponent({ html1: this.getForm(), html2: this.getMessages() })
  }

  getForm() {
    const form = new HTML()
    form.append(this.getKeyInput())
    form.append(this.getTextInput())
    form.append(new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() }))
    return form
  }

  getKeyInput() {
    return this.children.key_input
  }

  getTextInput() {
    return this.children.text_input
  }

  onSendButtonClick() { alert('Not Implemented!') }

  addMessage(message = new MessageModel()) {
    this.children.messages.append(this.parseMessage(message))
  }

  getMessages() {
    return this.children.messages
  }
}
