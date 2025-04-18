import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'

import * as LOCAL from '../../assets/js/utils/local.js'

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
    this.append(new TextComponent({ text: 'Gmail API v1' }))
    this.append(new ButtonComponent({ text: 'List labels', onclick: () => this.listLabels() }))
    this.append(this.children.content)
  }

  listLabels() {
    gapi.load('client', () => {
      gapi.client.setToken({
        access_token: LOCAL.get(['google.access_token']),
        expires_in: 3600,
        scope: 'https://www.googleapis.com/auth/gmail.readonly',
        token_type: 'Bearer',
      })

      gapi.client.load('gmail', 'v1', () => {
        console.log('Gmail API loaded')
        this.listLabelsRequest()
      })
    })
  }

  listLabelsRequest() {
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
