import { HTML, nFlex, nInput, nButton } from '../../../assets/js/libs/afrontend/index.js'

export class FooterComponent extends HTML {
  children = {
    text: new nInput(),
    send: new nButton(),
  }

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
    this.children.text.setContainerStyle('padding', '1rem')
    this.children.text.setStyle('padding', 'calc(1rem / 4)')
    this.children.text.setStyle('width', '100%')
    this.children.text.setPlaceholder('text')
    return this.children.text
  }

  getSendButton() {
    this.children.send.setContainerStyle('padding', '1rem')
    this.children.send.setStyle('padding', 'calc(1rem / 4)')
    this.children.send.setStyle('width', '100%')
    this.children.send.setText('send')
    this.children.send.addEventListener('click', () => this.onSendButtonClick())
    return this.children.send
  }

  onSendButtonClick() {
    this.dispatch('send', this.children.text.getValue())
  }
}
