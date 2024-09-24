import { HTML } from '../../assets/js/libs/frontend/index.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { ImageLinkComponent } from '../../assets/js/components/image.link.component.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { MessageModel } from './models/message.model.js'

export class Page extends PaddingComponent {
  children = {
    ip: new HTML(),
    messages: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeader())
    this.append(this.getBody())
  }

  getHeader() {
    return new TwoColumnsComponent({
      html1: new ImageLinkComponent({ src: './logo.png', href: 'https://developers.google.com/photos' }),
      html2: new HTML(),
    })
  }

  getBody() {
    return new TwoColumnsComponent({ html1: this.getForm(), html2: this.getMessages() })
  }

  getForm() {
    const form = new HTML()
    form.append(new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() }))
    return form
  }

  onSendButtonClick() {
    console.log('on send button click')
  }

  addMessage(message = new MessageModel()) {
    this.children.messages.append(new TextComponent({ text: message.type }))
  }

  getMessages() {
    this.children.messages.setStyle('text-align', 'right')
    return this.children.messages
  }
}
