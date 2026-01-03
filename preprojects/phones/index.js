import { FirebaseDatabasePageComponent } from '../../assets/js/components/firebase.database.page.component.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'

export class Page extends FirebaseDatabasePageComponent {
  phone_input = new InputComponent({ placeholder: 'phone' })

  getDirectory() { return 'phones' }

  onCreate() {
    super.onCreate()
    this.append(new LinkComponent({ text: 'phones', href: '?' }))
    this.append(new TwoColumnsComponent({
      html1: this.phone_input,
      html2: new ButtonComponent({ text: 'get phone', onclick: () => this.getPhone() }),
      widths: ['79%', '20%'],
    }))
  }

  getPhone(phone = this.phone_input.input.getValue(), datetime = Date.now().toString()) {
    this.save({ number: phone }).then(() => alert('saved')).catch(() => alert('error'))
  }
}
