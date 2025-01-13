import { initializeApp } from '../../assets/js/apis/firebase/app/index.js'
import { getFirestore } from '../../assets/js/apis/firebase/firestore/index.js'
import { getDatabase, ref, set } from '../../assets/js/apis/firebase/database/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { SelectComponent } from '../../assets/js/components/select.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import * as firebase from '../../assets/js/config/firebase/index.js'
import * as RDAP from '../../assets/js/apis/rdap.js'

export class Page extends PaddingComponent {
  children = {
    domain_input: new InputComponent({ label: 'domain' }),
    suffix_input: new SelectComponent({ label: 'suffix', options: [['_com', '.com'], ['_com_br', '.com.br']] }),
    send_button: new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() })
  }

  state = {
    app: null,
    db: null,
    database: null,
  }

  onCreate() {
    super.onCreate()
    this.append(this.getDomainInputComponent())
    this.append(this.getSuffixInputComponent())
    this.append(this.getSendButtonComponent())
    this.init()
  }

  init() {
    this.state.app = initializeApp(firebase)
    this.state.db = getFirestore(this.state.app)
    this.state.database = getDatabase(this.state.app)
  }

  getDomainInputComponent() {
    return this.children.domain_input
  }

  getSuffixInputComponent() {
    return this.children.suffix_input
  }

  getSendButtonComponent() {
    return this.children.send_button
  }

  onSendButtonClick() {
    const domain = this.children.domain_input.children.input.getValue()
    const suffix = this.children.suffix_input.children.input.getValue()
    this.findDomain(domain, suffix)
      .then(json => console.log({ json }))
      .catch(err => console.error(err))
  }

  async findDomain(domain, suffix, datetime = Date.now().toString()) {
    const json = await RDAP.domain(domain + suffix.replaceAll('_', '.'))

    const data1 = { domain, suffix, json, datetime, location: window.location.toString() }

    const ref1 = ref(this.state.database, 'domains/' + datetime)

    await set(ref1, data1)

    return json
  }
}
