import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { client_id } from '../../assets/js/config/googleusercontent/client_id.js'

export class Page extends PaddingComponent {
  children = {
    client_id: new InputComponent({ label: 'client id' }),
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'youtube live streaming api' }))
    this.append(new ButtonComponent({ text: 'load auth2', onclick: () => this.onLoadAuth2() }))
    this.append(new ButtonComponent({ text: 'auth2 init', onclick: () => this.onAuth2Init() }))
  }

  onLoadAuth2() {
    gapi.load('auth2', () => this.append(new TextComponent({ text: 'load auth2' })))
  }

  onGoogleAccountsIdInitialize(...data) {
    this.append(new TextComponent({ text: JSON.stringify(data, null, 4) }))
  }

  onAuth2Init() {
    google.accounts.id.initialize({ client_id, callback: this.onGoogleAccountsIdInitialize.bind(this) })
    google.accounts.id.prompt()
  }
}
