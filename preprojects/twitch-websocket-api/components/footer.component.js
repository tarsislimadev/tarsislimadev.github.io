import { HTML, nFlex, nInput, nButton } from '../../../assets/js/libs/afrontend/index.js'

export class FooterComponent extends HTML {
  text = new nInput()
  send = new nButton()

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getTextInput().setContainerStyle('width', '80%'))
    flex.append(this.getSendButton().setContainerStyle('width', '20%'))
    return flex
  }

  getTextInput() {
    this.text.setContainerStyle('padding', '1rem')
    this.text.setStyle('padding', 'calc(1rem / 4)')
    this.text.setStyle('width', '100%')
    this.text.setPlaceholder('text')
    return this.text
  }

  getSendButton() {
    this.send.setContainerStyle('padding', '1rem')
    this.send.setStyle('padding', 'calc(1rem / 4)')
    this.send.setStyle('width', '100%')
    this.send.setText('send')
    this.send.addEventListener('click', () => this.onSendButtonClick())
    return this.send
  }

  onSendButtonClick() {
    this.dispatch('send', this.text.getValue())
  }
}
