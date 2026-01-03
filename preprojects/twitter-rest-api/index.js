import { HTML, nInputTextGroup, nButton } from '../../assets/js/libs/afrontend/index.js'

import { FormComponent } from '../../assets/js/components/form.component.js'

// https://developer.twitter.com/en/docs/authentication/oauth-2-0/authorization-code

export class Page extends HTML {
  ResponseType = new nInputTextGroup()
  ClientId = new nInputTextGroup()
  RedirectUri = new nInputTextGroup()
  Scope = new nInputTextGroup()
  State = new nInputTextGroup()
  CodeChallenge = new nInputTextGroup()
  CodeChallengeMethod = new nInputTextGroup()
  SubmitButton = new nButton()

  onCreate() {
    super.onCreate()
    this.append(this.getTitle())
    this.append(this.getForm())
  }

  getTitle() {
    const title = new HTML()
    title.setText('Twitter')
    return title
  }

  getForm() {
    const form = new FormComponent()
    form.setAction('https://twitter.com/i/oauth2/authorize')
    form.append(this.getResponseType())
    form.append(this.getClientId())
    form.append(this.getRedirectUri())
    form.append(this.getScope())
    form.append(this.getState())
    form.append(this.getCodeChallenge())
    form.append(this.getCodeChallengeMethod())
    form.append(this.getSubmitButton())
    return form
  }

  getResponseType() {
    this.ResponseType.label.setText('Response Type')
    this.ResponseType.input.setValue('code')
    return this.ResponseType
  }

  getClientId() {
    this.ClientId.label.setText('Client Id')
    this.ClientId.input.setValue('this.ClientId')
    return this.ClientId
  }

  getRedirectUri() {
    this.RedirectUri.label.setText('Redirect Uri')
    this.RedirectUri.input.setValue(window.location.toString())
    return this.RedirectUri
  }

  getScope() {
    this.Scope.label.setText('Scope')
    this.Scope.input.setValue('tweet.read users.read offline.access')
    return this.Scope
  }

  getState() {
    this.State.label.setText('State')
    this.State.input.setValue('state')
    return this.State
  }

  getCodeChallenge() {
    this.CodeChallenge.label.setText('Code Challenge')
    this.CodeChallenge.input.setValue('challenge')
    return this.CodeChallenge
  }

  getCodeChallengeMethod() {
    this.CodeChallengeMethod.label.setText('Code Challenge Method')
    this.CodeChallengeMethod.input.setValue('plain')
    return this.CodeChallengeMethod
  }

  getSubmitButton() {
    this.SubmitButton.setText('Submit')
    return this.SubmitButton
  }
}
