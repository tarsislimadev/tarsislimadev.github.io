import { HTML, nFlex, nInput, nButton } from '../../../assets/js/libs/afrontend/index.js'
import { TwoColumnsComponent } from '../../../assets/js/components/two.columns.component.js'

export class SendComponent extends HTML {
  text = new nInput()
  send = new nButton()

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    return new TwoColumnsComponent({
      html1: this.getTextInput(),
      html2: this.getSendButton(),
      widths: ['78%', '20%'],
    })
  }

  getTextInput() {
    this.text.setStyle('margin', '0rem 0rem calc(1rem / 4) 0rem')
    this.text.setStyle('padding', 'calc(1rem / 4)')
    this.text.setStyle('width', '100%')
    this.text.setPlaceholder('text')
    return this.text
  }

  getSendButton() {
    this.send.setStyle('margin', '0rem 0rem calc(1rem / 4) 0rem')
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
