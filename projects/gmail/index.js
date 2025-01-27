import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'

import * as LOCAL from '../../assets/js/utils/local.js'

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
    this.append(new ButtonComponent({ text: 'List labels', onclick: () => this.listLabels() }))
    this.append(this.children.content)
  }

  setEvents() {
    window.addEventListener('gsiclient', console.log)
  }

  getAccessToken() {
    const access_token = LOCAL.get(['google.access_token'])
    console.log({ access_token })
    return access_token
  }

  listLabels() {
    rest.gmail.v1.users.getProfile().then(console.log)
    // gapi.client.gmail.users.labels.list({ 'userId': 'me' })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.error(err))
  }
}
