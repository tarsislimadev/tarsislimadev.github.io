import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { FirebaseDatabasePageComponent } from '../../assets/js/components/firebase.database.page.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'

class PaymentComponent extends HTML {
  how_much = new InputComponent({ type: 'number', placeholder: 'Amount' })
  status = new InputComponent({ type: 'text', placeholder: 'Status' })
  where = new InputComponent({ type: 'text', placeholder: 'Where' })
  when = new InputComponent({ type: 'date', placeholder: 'Date' })
  who = new InputComponent({ type: 'text', placeholder: 'Who' })

  id = new InputComponent({ type: 'hidden' })

  onCreate() {
    super.onCreate()
    this.append(this.id)
    this.append(this.where)
    this.append(this.who)
    this.append(this.how_much)
    this.append(this.status)
    this.append(this.when)
    this.append(new ButtonComponent({ text: 'cancel', onclick: () => this.onCancelButtonClick() }))
    this.append(new ButtonComponent({ text: 'save', onclick: () => this.onSaveButtonClick() }))
  }

  clearFields() {
    this.id.setValue('')
    this.how_much.setValue('')
    this.status.setValue('')
    this.where.setValue('')
    this.when.setValue('')
    this.who.setValue('')
  }

  onSaveButtonClick() {
    this.dispatch('save', {
      id: this.id.getValue(),
      how_much: this.how_much.getValue(),
      status: this.status.getValue(),
      where: this.where.getValue(),
      when: this.when.getValue(),
      who: this.who.getValue(),
    })
    this.clearFields()
  }

  onCancelButtonClick() {
    this.dispatch('cancel')
    this.clearFields()
  }

  updatePayment(id, values = {}) {
    this.id.setValue(id)
    this.how_much.setValue(values['how_much'])
    this.status.setValue(values['status'])
    this.where.setValue(values['where'])
    this.when.setValue(values['when'])
    this.who.setValue(values['who'])
  }
}

export class Page extends FirebaseDatabasePageComponent {
  create_button = new ButtonComponent({ text: 'create', onclick: () => this.onCreateButtonClick() })
  payment = new PaymentComponent()

  getDirectory() { return 'payments' }

  onCreate() {
    super.onCreate()
    this.append(new LinkComponent({ text: 'payments', href: '?' }))
    this.append(this.getCreateButton())
    this.append(this.getPayment())
    this.updateList()
  }

  onCreateButtonClick() {
    this.hide(this.create_button)
    this.show(this.payment)
  }

  getCreateButton() {
    this.show(this.create_button)
    return this.create_button
  }

  createPayment(data) {
    return this.save(data)
  }

  updateList() {
    this.list().then((data) => {
      console.log('list', data)
      this.hide(this.payment)
      this.show(this.create_button)
    }).catch(console.error)
  }

  getPayment() {
    this.hide(this.payment)
    this.payment.addEventListener('save', (e) => {
      this.createPayment(e.value).then(() => {
        this.hide(this.payment)
        this.show(this.create_button)
      }).catch(console.error).finally(() => this.updateList())
    })
    this.payment.addEventListener('cancel', () => {
      this.hide(this.payment)
      this.show(this.create_button)
    })
    return this.payment
  }

  hide(el = new HTML()) {
    if (el) el.setStyle('display', 'none')
  }

  show(el = new HTML()) {
    if (el) el.setStyle('display', 'block')
  }
}
