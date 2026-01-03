import { HTML } from '../../../assets/js/libs/afrontend/index.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import { InputComponent } from '../../../assets/js/components/input.component.js'

export class FormComponent extends HTML {
  tld = new InputComponent({ label: 'tld', value: 'google.com.br' })

  onCreate() {
    super.onCreate()
    this.append(this.getTldInputComponent())
    this.append(new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() }))
  }

  getTldInputComponent() {
    return this.tld
  }

  onSendButtonClick() {
    this.dispatch('submit', { tld: this.tld.getValue() })
  }
}
