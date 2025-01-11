import { initializeApp } from '../../assets/js/apis/firebase/app/index.js'
import { getFirestore, collection, getDocs } from '../../assets/js/apis/firebase/firestore/index.js'
import { getDatabase, ref, set } from '../../assets/js/apis/firebase/database/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import * as firebase from '../../assets/js/config/firebase/index.js'

export class Page extends PaddingComponent {
  children = {
    email_input: new InputComponent({ label: 'e-mail' }),
    send_button: new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() })
  }

  state = {
    app: null,
    db: null,
    database: null,
  }

  onCreate() {
    super.onCreate()
    this.append(this.getEmailInputComponent())
    this.append(this.getSendButtonComponent())
    this.init()
  }

  init() {
    this.state.app = initializeApp(firebase)
    this.state.db = getFirestore(this.state.app)
    this.state.database = getDatabase(this.state.app)
  }

  getEmailInputComponent() {
    return this.children.email_input
  }

  getSendButtonComponent() {
    return this.children.send_button
  }

  onSendButtonClick() {
    this.saveData()
  }

  saveData() {
    const datetime = Date.now().toString()

    const data1 = { email: this.children.email_input.children.input.getValue(), datetime }

    const ref1 = ref(this.state.database, 'firebase/' + datetime)

    set(ref1, data1).then(() => {
      console.log('Document successfully written!')
    })
  }
}
