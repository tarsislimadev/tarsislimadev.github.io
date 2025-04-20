import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'

import * as LOCAL from '../../assets/js/utils/local.js'

import apiKey from '../../assets/js/config/googleusercontent/api_key.js'
import clientId from '../../assets/js/config/googleusercontent/client_id.js'

export class Page extends HTML {
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
    this.append(new ButtonComponent({ text: 'List labels', onclick: () => this.listLabels() }))
    this.append(this.children.content)
  }

  setEvents() {
    const self = this
    this.addEventListener('googleCredential', ({ value }) => {
      console.log('googleCredential', value)
      self.state.tokenClient = value.credential
    })
  }

  listLabels() {
    gapi.load('client', () => {
      gapi.client.init({
        clientId,
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
        ],
        scope: [
          'https://mail.google.com/',
          'https://www.googleapis.com/auth/gmail.modify',
          'https://www.googleapis.com/auth/gmail.readonly',
          'https://www.googleapis.com/auth/gmail.labels',
          'https://www.googleapis.com/auth/gmail.metadata'
        ].join(' '),
      }).then(() => {
        this.state.gapiInited = true
        this.getGmailUsersLabelsList()
      })
    })
  }

  getGmailUsersLabelsList() {
    gapi.load('client')
    gapi.client.setApiKey(apiKey)
    gapi.client.setToken({
      access_token: this.state.tokenClient,
    }).then(() => {
      gapi.client.load('gmail', 'v1', () => {
        console.log('Gmail API loaded')

        gapi.client.gmail.users.labels.list({ 'userId': 'me' })
          .then((res) => {
            console.log(res)
            this.children.content.setText(JSON.stringify(res))
          })
          .catch((err) => {
            console.error(err)
            this.children.content.setText(JSON.stringify(err))
          })
      })
    }).catch((err) => {
      console.error(err)
      this.children.content.setText(JSON.stringify(err))
    })
  }
}
