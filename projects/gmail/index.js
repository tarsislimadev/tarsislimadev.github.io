import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'

import * as LOCAL from '../../assets/js/utils/local.js'

const GOOGLE_APIKEY = "AIzaSyAR46mxrxBd99WmuuUYeICC9b_9krV6n8E"

export class Page extends PaddingComponent {
  children = {
    content: new HTML(),
  }

  state = {
    tokenClient: null,
    gapiInited: false,
    gisInited: false,
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(new TextComponent({ text: 'Gmail API v1' }))
    this.append(new ButtonComponent({ text: 'Google init', onclick: () => this.googleInit() }))
    this.append(new ButtonComponent({ text: 'List labels', onclick: () => this.listLabels() }))
    this.append(this.children.content)
  }

  setEvents() {
    window.addEventListener('googleplatform', () => {
      gapi.signin2.render('google-signin-button', {
        'onsuccess': console.log,
        'onfailure': console.error,
        'scope': 'https://www.googleapis.com/auth/gmail.readonly',
      })
    })
  }

  getAccessToken() {
    throw new Error('getAccessToken not implemented')
  }

  googleInit(access_token = LOCAL.get(['google.access_token'])) {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: GOOGLE_APIKEY,
        clientId: LOCAL.get(['google.client_id']),
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
        scope: 'https://www.googleapis.com/auth/gmail.readonly',
      }).then(() => {
        this.state.gapiInited = true
        this.children.content.setText('GAPI initialized')
        console.log('GAPI initialized')
        this.children.content.setText(JSON.stringify(gapi.client))
        // this.children.content.setText(JSON.stringify(gapi.client.gmail.users.labels.get))
      })
    })
  }

  listLabels() {
    if (!this.state.gapiInited) {
      console.error('GAPI not initialized')
      return
    }
    gapi.client.gmail.users.labels.list({ 'userId': 'me' })
      .then((res) => {
        console.log(res)
        this.children.content.setText(JSON.stringify(res))
      })
      .catch((err) => {
        console.error(err)
        this.children.content.setText(JSON.stringify(err))
      })
  }
}
