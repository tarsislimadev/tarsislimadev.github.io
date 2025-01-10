import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js'
import * as firebaseConfig from '../../assets/js/utils/firebaseConfig/index.js'

export class Page extends PaddingComponent {
  children = {
    email_input: new InputComponent({ label: 'e-mail' }),
    whatsapp_input: new InputComponent({ label: 'e-mail' }),
    send_button: new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() })
  }

  state = {
    app: null,
    db: null,
  }

  onCreate() {
    super.onCreate()
    this.append(this.getEmailInputComponent())
    this.append(this.getWhatsAppInputComponent())
    this.append(this.getSendButtonComponent())
    this.init()
  }

  init() {
    this.state.app = initializeApp(firebaseConfig)
    this.state.db = getFirestore(app)
  }

  getEmailInputComponent() {
    return this.children.email
  }

  getWhatsAppInputComponent() {
    return this.children.whatsapp_input
  }

  getSendButtonComponent() {
    return this.children.send_button
  }

  onSendButtonClick() {
    this.getCities()
    alert('send')
  }

  async getCities() {
    const citiesCol = collection(this.state.db, 'cities')
    const citySnapshot = await getDocs(citiesCol)
    const cityList = citySnapshot.docs.map(doc => doc.data())
    console.log({ cityList })
  }
}
