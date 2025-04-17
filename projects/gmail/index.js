import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'

import * as LOCAL from '../../assets/js/utils/local.js'

import * as GOOGLE from '../../assets/js/config/googleusercontent/_index.js'

import { rest } from '../../assets/js/utils/api.js'

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
    window.addEventListener('gsiclient', console.log)
  }

  getAccessToken() {
    throw new Error('getAccessToken not implemented')
  }

  googleInit() {
    gapi.client.init({
      apiKey: GOOGLE.API_KEY,
      clientId: GOOGLE.CLIENT_ID,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
      scope: 'https://www.googleapis.com/auth/gmail.readonly',
    }).then(() => {
      console.log('GAPI initialized')
      this.state.gapiInited = true
      this.getAccessToken()
    }
    ).catch((err) => {
      console.error('Error initializing GAPI', err)
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
