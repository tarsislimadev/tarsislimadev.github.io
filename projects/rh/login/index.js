import { nButton, HTML, nInput } from '../js/components/index.js'
import { TopBar } from '../components/bars/top.js'
import * as LOCAL from '../js/utils/local.js'
import * as PAGES from '../js/utils/pages.js'
import * as FLOW from '../js/utils/flow.js'
import * as API from '../js/utils/api.js'

export class Page extends HTML {
  children = {
    email: new nInput(),
    password: new nInput(),
    button: new nButton(),
  }

  onCreate() {
    super.onCreate()
    this.append(new TopBar())
    this.append(this.getEmailInput())
    this.append(this.getPasswordInput())
    this.append(this.getButton())
  }

  getEmailInput() {
    this.children.email.setPlaceholder('e-mail')
    this.children.email.setValue('mail@mail.com')

    return this.children.email
  }

  getPasswordInput() {
    this.children.password.setPlaceholder('password')
    this.children.password.setValue('password')
    this.children.password.setAttr('type', 'password')
    return this.children.password
  }

  getButton() {
    this.children.button.setText('register')
    this.children.button.on('click', () => {
      const email = this.children.email.getValue()
      const password = this.children.password.getValue()

      API.usersLogin({ email, password })
        .then((res) => {
          const email = res.get('email')
          const id = res.get('id')

          LOCAL.set('session', { email, id })
          FLOW.goTo(PAGES.INDEX)
        })
        .catch((err) => console.error(err))
    })

    return this.children.button
  }
}
