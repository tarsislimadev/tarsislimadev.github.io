import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { initializeApp } from '../../assets/js/apis/firebase/app/index.js'
import { getFirestore } from '../../assets/js/apis/firebase/firestore/index.js'
import { getDatabase, ref, set } from '../../assets/js/apis/firebase/database/index.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import firebase from '../../assets/js/config/firebase/index.js'
import * as RDAP from '../../assets/js/apis/rdap.js'

class nPre extends HTML {
  getName() { return 'pre' }

  getTagName() { return 'pre' }
}

export class Page extends PageComponent {
  domain_input = new InputComponent({ label: 'domain' })
  send_button = new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() })
  info = new nPre()

  state = {
    app: null,
    db: null,
    database: null,
    json: null,
  }

  onCreate() {
    super.onCreate()
    this.append(this.getDomainInputComponent())
    this.append(this.getSendButtonComponent())
    this.append(this.getInfoText())
    this.init()
    this.setValues()
  }

  init() {
    this.state.app = initializeApp(firebase)
    this.state.db = getFirestore(this.state.app)
    this.state.database = getDatabase(this.state.app)
  }

  getDomainInputComponent() {
    this.domain_input.addEventListener('keypress', ({ key }) => key == 'Enter' && this.findDomain())
    return this.domain_input
  }

  getSendButtonComponent() {
    return this.send_button
  }

  onSendButtonClick() {
    this.findDomain()
  }

  writeInfo(info = {}) {
    this.info.setText(JSON.stringify(info, null, 4))
  }

  findDomain(domain = this.domain_input.input.getValue(), datetime = Date.now().toString()) {
    const ref1 = ref(this.state.database, 'domains/' + datetime)
    RDAP.domain(domain)
      .then((json) => this.state.json = json)
      .then(() => set(ref1, { domain, json: this.state.json, datetime, location: window.location.toString() }))
      .then(() => this.writeInfo(this.state.json))
      .catch((err) => this.writeInfo(err))
  }

  getInfoText() {
    return this.info
  }

  setValues() {
    this.domain_input.input.setValue((new URL(window.location)).searchParams.get('id'))
  }
}
