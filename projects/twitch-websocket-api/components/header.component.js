import { HTML, nFlex, nInput, nButton } from '../../../assets/js/libs/afrontend/index.js'

export class HeaderComponent extends HTML {
  url = new nInput()
  connect = new nButton()

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getUrlInput().setContainerStyle('width', '80%'))
    flex.append(this.getConnectButton().setContainerStyle('width', '20%'))
    return flex
  }

  getUrlInput() {
    this.url.setContainerStyle('padding', '1rem')
    this.url.setStyle('padding', 'calc(1rem / 4)')
    this.url.setStyle('width', '100%')
    this.url.setPlaceholder('url')
    return this.url
  }

  getConnectButton() {
    this.connect.setContainerStyle('padding', '1rem')
    this.connect.setStyle('padding', 'calc(1rem / 4)')
    this.connect.setStyle('width', '100%')
    this.connect.setText('connect')
    this.connect.addEventListener('click', () => this.onConnectButtonClick())
    return this.connect
  }

  onConnectButtonClick() {
    this.dispatch('connect', this.url.getValue())
  }
}
