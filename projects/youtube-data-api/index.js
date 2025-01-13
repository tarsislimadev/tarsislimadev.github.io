import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'

import Youtube from '../../assets/js/config/googleusercontent/scopes/youtube.js'
import YoutubeUpload from '../../assets/js/config/googleusercontent/scopes/youtube.upload.js'
import YoutubeForceSSL from '../../assets/js/config/googleusercontent/scopes/youtube.force-ssl.js'

import GOOGLE from '../../assets/js/config/googleusercontent/index.js'

export class Page extends PaddingComponent {
  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'Youtube Data API' }))
    this.append(new ButtonComponent({ text: 'login', onclick: () => this.onLoginButtonClick() }))
    this.append(new ButtonComponent({ text: 'channels:list', onclick: () => this.onChannelsListClick() }))
    this.append(new ButtonComponent({ text: 'videos:list', onclick: () => this.onVideosListClick() }))
  }

  onLoginButtonClick() {
    window.location = (this.createGoogleOAuthEndpoint())
  }

  createGoogleOAuthEndpoint({ client_id = GOOGLE.client_id, redirect_uri = GOOGLE.redirect_uri, response_type = GOOGLE.response_type, scope = this.getScope() } = {}) {
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&`
  }

  getScope() {
    return [Youtube, YoutubeUpload, YoutubeForceSSL].join(' ')
  }

  onChannelsListClick() {
    alert('Channels List')
  }

  onVideosListClick() {
    alert('Videos List')
  }
}
