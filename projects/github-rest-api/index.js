import { HTML, nLink, nButton, nInputTextGroup } from '../../assets/js/libs/afrontend/index.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { getURLSearchParam } from '../../assets/js/utils/url.js'
import * as Local from '../../assets/js/utils/local.js'
import * as Flow from '../../assets/js/utils/flow.js'
import { client_id } from './config.js'

export class Page extends PageComponent {
  responses = new HTML()
  access_token = new InputComponent({ label: 'access token' })

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'github rest api' }))
    this.append(this.getLoginLink())
    this.append(this.getTokensLink())
    this.append(this.getAccessTokenInput())
    this.append(this.getApiUserButton())
    this.append(this.getResonsesHTML())
    this.setOauthCode()
  }

  getLoginLink() {
    return new LinkComponent({ text: 'login', href: `https://github.com/login/oauth/authorize?scope=user:email&client_id=${client_id}` })
  }

  getTokensLink() {
    return new LinkComponent({ text: 'settings/tokens', href: 'https://github.com/settings/tokens?type=beta' })
  }

  getAccessTokenInput() {
    return this.access_token
  }

  getApiUserButton() {
    return new ButtonComponent({ text: 'api.github.com/user', onclick: () => this.onApiUserButton() })
  }

  onApiUserButton() {
    fetch('https://api.github.com/user', { headers: this.getHeaders() })
      .then(res => res.json())
      .then((json) => this.responses.append(new TextComponent(JSON.stringify(json, null, 4))))
      .catch((err) => this.responses.append(new TextComponent(err.message)))
  }

  getHeaders() {
    return {
      Authorization: `token ${this.access_token.input.getValue()}`,
    }
  }

  getResonsesHTML() {
    return this.responses
  }

  setOauthCode() {
    const github_code = getURLSearchParam('code')
    if (github_code) {
      Local.set(['github_code'], github_code)
      Flow.goTo('index.html')
    }
  }

}
