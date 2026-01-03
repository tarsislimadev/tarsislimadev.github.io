import { nButton, HTML, nInput } from '../js/components/index.js'
import { TopBar } from '../components/bars/top.js'
import * as LOCAL from '../js/utils/local.js'
import * as PAGES from '../js/utils/pages.js'
import * as FLOW from '../js/utils/flow.js'
import * as API from '../js/utils/api.js'

export class Page extends HTML {
  email = new nInput()
  password = new nInput()
  button = new nButton()

  onCreate() {
    super.onCreate()
    this.append(new TopBar())
    this.append(this.getEmailInput())
    this.append(this.getPasswordInput())
    this.append(this.getButton())
  }

  getEmailInput() {
    this.email.setPlaceholder('e-mail')
    this.email.setValue('mail@mail.com')

    return this.email
  }

  getPasswordInput() {
    this.password.setPlaceholder('password')
    this.password.setValue('password')
    this.password.setAttr('type', 'password')
    return this.password
  }

  getButton() {
    this.button.setText('register')
    this.button.on('click', () => {
      const email = this.email.getValue()
      const password = this.password.getValue()

      API.usersLogin({ email, password })
        .then((res) => {
          const email = res.get('email')
          const id = res.get('id')

          LOCAL.set('session', { email, id })
          FLOW.goTo(PAGES.INDEX)
        })
        .catch((err) => console.error(err))
    })

    return this.button
  }
}
