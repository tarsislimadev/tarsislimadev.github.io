import { HTML } from './assets/js/libs/afrontend/index.js'
import { FirebaseDatabasePageComponent } from './assets/js/components/firebase.database.page.component.js'
import { TwoColumnsComponent } from './assets/js/components/two.columns.component.js'
import { SeparatorComponent } from './assets/js/components/separator.component.js'
import { ButtonComponent } from './assets/js/components/button.component.js'
import { TitleComponent } from './assets/js/components/title.component.js'
import { InputComponent } from './assets/js/components/input.component.js'
import { ImageComponent } from './assets/js/components/image.component.js'
import { TextComponent } from './assets/js/components/text.component.js'
import OWNER from './assets/js/owner.js'

export class Page extends FirebaseDatabasePageComponent {
  name = new InputComponent({ placeholder: 'Nome' }),
  email = new InputComponent({ placeholder: 'E-mail' }),
  whatsapp = new InputComponent({ placeholder: 'WhatsApp' }),
  send_button = new ButtonComponent({ text: 'Enviar', onclick: () => this.onSendButtonComponentClick() }),

  onCreate() {
    super.onCreate()
    this.append(new TwoColumnsComponent({
      html1: this.getHTML2(),
      html2: this.getHTML1(),
      widths: ['59%', '40%']
    }))
  }

  getHTML1() {
    const html = new HTML()
    html.append(new TitleComponent({ text: OWNER.name }))
    html.append(new TextComponent({ text: OWNER.description }))
    html.append(new SeparatorComponent({}))
    html.append(new TextComponent({ text: 'Entre em contato' }))
    html.append(this.getNameInputComponent())
    html.append(this.getEmailInputComponent())
    html.append(this.getWhatsAppInputComponent())
    html.append(this.getSendButtonComponent())
    return html
  }

  getNameInputComponent() {
    return this.name
  }

  getEmailInputComponent() {
    return this.email
  }

  getWhatsAppInputComponent() {
    return this.whatsapp
  }

  getSendButtonComponent() {
    return this.send_button
  }

  onSendButtonComponentClick() {
    const name = this.name.getValue()
    const email = this.email.getValue()
    const whatsapp = this.whatsapp.getValue()

    if (!name || !email || !whatsapp) {
      alert('Preencha todos os campos')
      return
    }

    this.save({ name, email, whatsapp }).then(() => {
      this.name.setValue('')
      this.email.setValue('')
      this.whatsapp.setValue('')
      alert('Mensagem enviada com sucesso!')
    }).catch((err) => {
      console.error(err)
      alert('Erro ao enviar os dados')
    })
  }

  getHTML2() {
    const html = new HTML()
    html.setStyle('text-align', 'center')
    html.append(new ImageComponent({ src: './assets/img/me.png', alt: OWNER.name }))
    return html
  }
}
