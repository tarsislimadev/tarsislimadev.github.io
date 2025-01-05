import { HTML, nInput } from '../../assets/js/libs/afrontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'

import * as GOOGLE from '../../assets/js/utils/googleusercontent.js'

export class Page extends PaddingComponent {
  children = {
    email_input: new InputComponent({ label: 'e-mail' }),
    send_button: new ButtonComponent({ text: 'send', onclick: () => this.onSendButonClick() }),
  }

  onSendButonClick() {
    alert('send ' + this.children.email_input.getValue())
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'newsletter' }))
    this.append(this.getForm())
  }

  getForm() {
    const html = new HTML()
    html.setStyle('margin', '0rem auto')
    html.setStyle('width', '30rem')
    html.append(this.getEmailInputComponent())
    html.append(this.getSendButtonComponent())
    return html
  }

  getEmailInputComponent() {
    return this.children.email_input
  }

  getSendButtonComponent() {
    return this.children.send_button
  }
}
