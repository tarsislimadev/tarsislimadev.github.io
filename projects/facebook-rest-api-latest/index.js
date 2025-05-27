import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import * as Local from '../../assets/js/utils/local.js'
import { rest } from '../../assets/js/utils/api.js'

export class Page extends PageComponent {
  children = {
    title: new HTML(),
    responses: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'facebook javascript sdk' }))
    this.append(this.getButtonsFlex())
    this.append(this.getResponses())
  }

  getButtonsFlex() {
    const html = new HTML()
    this.append(new ButtonComponent({ text: 'Login', onclick: () => this.onFacebookLoginButtonClick() }))
    this.append(new ButtonComponent({ text: 'Get Login Status', onclick: () => this.onFacebookGetLoginStatusButtonClick() }))
    this.append(new ButtonComponent({ text: 'Publish a Status Message', onclick: () => this.onFacebookPublishStatusMessageButtonClick() }))
    this.append(new ButtonComponent({ text: 'Logout', onclick: () => this.onFacebookLogoutButtonClick() }))
    this.append(new ButtonComponent({ text: 'A place', onclick: () => this.onFacebookPlaceButtonClick() }))
    return html
  }

  onFacebookLoginButtonClick() {
    const config_id = 1
    const scope = 'email,user_likes'
    FB.login((data) => this.onFacebookLogin(data), { config_id, scope })
  }

  onFacebookLogin(data) {
    this.appendResponse('Login', data)
    Local.set(['facebook.access_token'], data.authResponse.accessToken)
  }

  onFacebookGetLoginStatusButtonClick() {
    FB.getLoginStatus((data) => this.appendResponse('Get Login Status', data), {})
  }

  onFacebookPublishStatusMessageButtonClick() {
    const message = `Date time: ${Date.now()}`
    FB.api('/me/feed', 'post', { message }, (data) => this.appendResponse('Publish a Status Message', data))
  }

  onFacebookLogoutButtonClick() {
    const access_token = Local.get(['facebook.access_token'])
    FB.logout((data) => this.appendResponse('Logout', data), { access_token })
  }

  appendResponse(name, resp = {}) {
    const text = JSON.stringify({ name, resp }, null, 4)
    const text_component = new TextComponent({ text })
    this.children.responses.append(text_component)
  }

  getResponses() {
    return this.children.responses
  }

  onFacebookPlaceButtonClick() {
    rest.graph_facebook.v22_0.placeId()
      .then((res) => console.log({res}))
      .catch((err) => console.error(err))
  }
}
