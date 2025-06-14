import { HTML, nFlex, nInput, nButton } from '../../../assets/js/libs/afrontend/index.js'
import { TwoColumnsComponent } from '../../../assets/js/components/two.columns.component.js'

export class ConnectComponent extends HTML {
  url = new nInput()
  connect = new nButton()

  onCreate() {
    super.onCreate()
    this.append(new TwoColumnsComponent({
      html1: this.getUrlInput(),
      html2: this.getConnectButton(),
      widths: ['78%', '20%']
    }))
  }

  getUrlInput() {
    this.url.setStyle('padding', 'calc(1rem / 4)')
    this.url.setStyle('width', '100%')
    this.url.setPlaceholder('url')
    return this.url
  }

  getConnectButton() {
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
