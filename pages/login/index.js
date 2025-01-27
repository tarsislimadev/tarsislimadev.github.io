import { HTML, nInput } from '../../assets/js/libs/afrontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { FormComponent } from '../../assets/js/components/form.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'

import GOOGLE from '../../assets/js/config/googleusercontent/index.js'
import * as LOCAL from '../../assets/js/utils/local.js'
import * as FLOW from '../../assets/js/utils/flow.js'

class nInputHidden extends nInput {
  state = { key: null, value: '' }

  constructor({ key, value = '' } = {}) {
    super()
    this.state.key = key
    this.state.value = value
  }

  onCreate() {
    super.onCreate()
    this.setAttr('type', 'hidden')
    this.setAttr('name', this.state.key)
    this.setValue(this.state.value)
  }
}

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
      FLOW.goTo('/?access_token=1')
    } else {
      this.append(new TextComponent({ text: 'login' }))
      this.append(this.getButtons())
      this.append(this.getGoogleForm())
      this.setTokens()
    }
  }

  hasAccessToken() {
    return LOCAL.get(['google.access_token'], null) ||
      LOCAL.get(['facebook.access_token'], null) ||
      LOCAL.get(['linkedin.access_token'], null)
  }

  setTokens() {
    this.setGoogleToken()
    this.setFacebookToken()
    this.setLinkedInToken()
  }

  setGoogleToken(token = (new URL(window.location)).searchParams.get('code')) {
    LOCAL.set(['google.access_token'], token)
  }

  setFacebookToken(token) {
    console.log('set facebook Token')
  }

  setLinkedInToken(token) {
    console.log('set linkedIn Token')
  }

  getButtons() {
    const html = new HTML()
    html.append(new ButtonComponent({ text: 'google', onclick: () => this.children.google_form.submit() }))
    html.append(new ButtonComponent({ text: 'facebook', onclick: () => this.onFacebookLoginButtonClick() }))
    html.append(new ButtonComponent({ text: 'clear all', onclick: () => LOCAL.clear() }))
    return html
  }

  onFacebookLoginButtonClick() {
    console.log('on Facebook Login Button Click')
  }

  getGoogleForm() {
    this.children.google_form.setAttr('method', 'GET')
    this.children.google_form.setAttr('action', GOOGLE.auth_uri)

    this.children.google_form.append(new nInputHidden({ key: 'scope', value: this.getGetScopesByURL() }))

    Array.from(['api_key', 'auth_provider_x509_cert_url', 'auth_uri', 'client_id', 'project_id', 'redirect_uri', 'response_type', 'token_uri',]).map((key) => {
      this.children.google_form.append(new nInputHidden({ key, value: new String(GOOGLE[key]) }))
    })

    return this.children.google_form
  }

  getGetScopesByURL() {
    const arr = ['https://www.googleapis.com/auth/gmail.readonly']

    return arr.concat((new URL(window.location)).searchParams.get('scopes')?.toString().split(',')).join(' ')
  }
}
