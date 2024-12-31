import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'

import { CLIENT_ID } from '../../assets/js/utils/googleusercontent/client_id.js'
import { API_KEY } from '../../assets/js/utils/googleusercontent/api_key.js'
import DISCOVERY_DOC from '../../assets/js/utils/googleusercontent/discovery/gmail.js'
import SCOPES from '../../assets/js/utils/googleusercontent/scopes/gmail.readonly.js'

export class Page extends HTML {
  children = {
    content: new HTML(),
    authorize_button: new ButtonComponent({ text: 'authorize', onclick: () => this.onAuthorizeButtonClick() }),
    signout_button: new ButtonComponent({ text: 'signout', onclick: () => this.onSignoutButtonClick() }),
  }

  state = {
    tokenClient: null,
    gapiInited: false,
    gisInited: false,
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(new TextComponent({ text: 'gmail api' }))
    this.append(this.getAuthorizeButton())
    this.append(this.getSignoutButton())
  }

  maybeEnableButtons() {
    if (this.state.gapiInited && this.state.gisInited) {
      this.children.authorize_button.setStyle('visibility', 'visible')
    }
  }

  setEvents() {
    window.addEventListener('load', () => console.log('window loaded'))

    window.addEventListener('googleapi2', () => this.onGoogleApiLoaded())
    window.addEventListener('gsiclient2', () => this.onGsiClientLoaded())
  }

  onGoogleApiLoaded() {
    console.log('onGoogleApiLoaded')

    gapi.load('client', () => this.initializeGapiClient())
  }

  initializeGapiClient() {
    console.log('initializeGapiClient')

    this.state.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: () => console.log('gisLoaded initTokenClient'),
    })

    this.state.gisInited = true

    this.maybeEnableButtons()
  }

  async onGsiClientLoaded() {
    console.log('onGsiClientLoaded')

    console.log('gapi.client', gapi.client)

    if (!gapi.client) {
      setTimeout(() => this.onGsiClientLoaded(), 1000)
      return
    }

    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    })

    this.state.gapiInited = true

    this.maybeEnableButtons()
  }

  getAuthorizeButton() {
    this.children.authorize_button.setStyle('visibility', 'hidden')
    return this.children.authorize_button
  }

  onAuthorizeButtonClick() {
    this.state.tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) throw (resp)
      this.children.signout_button.setStyle('visibility', 'visible')
      this.children.authorize_button.setText('Refresh')
      await this.listLabels()
    }

    const prompt = gapi.client.getToken() === null ? 'consent' : ''

    this.state.tokenClient.requestAccessToken({ prompt })
  }

  getSignoutButton() {
    this.children.signout_button.setStyle('visibility', 'hidden')
    return this.children.signout_button
  }

  onSignoutButtonClick() {
    const token = gapi.client.getToken()
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token)
      gapi.client.setToken('')
      this.children.content.setText('')
      this.children.authorize_button.setText('Authorize')
      this.children.signout_button.setStyle('visibility', 'hidden')
    }
  }

  async listLabels() {
    let response
    try {
      response = await gapi.client.gmail.users.labels.list({ 'userId': 'me' })
    } catch (err) {
      this.children.content.setText(err.message)
      return
    }

    const labels = response.result.labels

    if (!labels || labels.length == 0) {
      this.children.content.setText('No labels found.')
      return
    }

    this.children.content.setText(
      labels.reduce((str, label) => `${str}${label.name}\n`, 'Labels:\n')
    )
  }
}
