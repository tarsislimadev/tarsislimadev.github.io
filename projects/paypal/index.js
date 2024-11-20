import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'

export class Page extends PaddingComponent {
  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'PayPal' }))
    this.append(new ButtonComponent({ text: 'Pay $2', onclick: () => this.onPayButtonClick() }))
  }

  onPayButtonClick() {
    alert('Pay $2')
  }
}
