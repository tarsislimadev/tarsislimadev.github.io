import { HTML } from './assets/js/libs/afrontend/index.js'
import { TwoColumnsComponent } from './assets/js/components/two.columns.component.js'
import { SeparatorComponent } from './assets/js/components/separator.component.js'
import { ButtonComponent } from './assets/js/components/button.component.js'
import { TitleComponent } from './assets/js/components/title.component.js'
import { InputComponent } from './assets/js/components/input.component.js'
import { ImageComponent } from './assets/js/components/image.component.js'
import { TextComponent } from './assets/js/components/text.component.js'
import OWNER from './assets/js/owner.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(new TwoColumnsComponent({
      html1: this.getHTML2(),
      html2: this.getHTML1(),
      widths: ['59%', '40%']
    }))
  }

  setStyles() {
    this.setStyle('background-color', '#000000')
  }

  getHTML1() {
    const html = new HTML()
    html.append(new TitleComponent({ text: OWNER.name }))
    html.append(new TextComponent({ text: OWNER.description }))
    html.append(new SeparatorComponent({}))
    html.append(new TextComponent({ text: 'Entre em contato' }))
    html.append(new InputComponent({ type: 'text', placeholder: 'Nome' }))
    html.append(new InputComponent({ type: 'text', placeholder: 'E-mail' }))
    html.append(new InputComponent({ type: 'text', placeholder: 'WhatsApp' }))
    html.append(new ButtonComponent({ text: 'Enviar', onclick: () => alert('Mensagem enviada!') }))
    return html
  }

  getHTML2() {
    const html = new HTML()
    html.setStyle('text-align', 'center')
    html.append(new ImageComponent({ src: './assets/img/me.png', alt: OWNER.name }))
    return html
  }
}
