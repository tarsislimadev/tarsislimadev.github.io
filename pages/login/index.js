import { HTML, nInput } from '../../assets/js/libs/frontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { FormComponent } from '../../assets/js/components/form.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import * as GOOGLE from '../../assets/js/utils/googleusercontent.js'
import * as LOCAL from '../../assets/js/utils/local.js'
import * as FLOW from '../../assets/js/utils/flow.js'

export class Page extends PaddingComponent {
  children = {
    google_form: new FormComponent(),
  }

  state = {
    hash_params: new URLSearchParams(window.location.hash.substr('1')),
  }

  onCreate() {
    super.onCreate()
    if (this.hasAccessToken()) {
      LOCAL.set(['access_token'], this.getAccessToken())
      FLOW.goTo('/?access_token=1')
    } else {
      this.append(new TextComponent({ text: 'login' }))
      this.append(this.getButtons())
      this.append(this.getGoogleForm())
    }
  }

  hasAccessToken() {
    return this.state.hash_params.has('access_token')
  }

  getAccessToken() {
    return this.state.hash_params.get('access_token')
  }

  getButtons() {
    const html = new HTML()
    html.append(this.getGoogleLoginButton())
    return html
  }

  getGoogleLoginButton() {
    return this.createButton('google', () => this.children.google_form.submit())
  }

  createButton(text, onclick = (() => { })) {
    return new ButtonComponent({ text, onclick })
  }

  getGoogleForm() {
    this.children.google_form.setAttr('method', 'GET')
    this.children.google_form.setAttr('action', GOOGLE.auth_uri)

    Object.keys(GOOGLE).filter((key) => (typeof GOOGLE[key]) === 'string').map((key) => {
      const input = new nInput()
      input.setAttr('type', 'hidden')
      input.setAttr('name', key)
      input.setValue(this.getGoogleValue(key))
      this.children.google_form.append(input)
    })

    return this.children.google_form
  }

  getGoogleValue(key) {
    const value = GOOGLE[key]
    if (key == 'redirect_uri') return FLOW.getCurrentURL()
    return value
  }
}
