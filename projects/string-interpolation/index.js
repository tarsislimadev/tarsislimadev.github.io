import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'

const DEFAULT_TEXT = '______'

export class Page extends PageComponent {
  input_text = new InputComponent({ placeholder: 'text' })
  text = new TextComponent()

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'string interpolation' }))
    this.append(this.getBoxComponent())
    this.updateText()
  }

  getBoxComponent() {
    const html = new HTML()

    html.append(this.getInputText())
    html.append(this.getText())

    html.setStyle('max-width', '20rem')
    html.setStyle('margin', '2rem auto')

    return html
  }

  getInputText() {
    this.input_text.input.addEventListener('keyup', () => this.updateText())
    return this.input_text
  }

  updateText() {
    this.setText(this.input_text.getValue())
  }

  setText(text = DEFAULT_TEXT) {
    this.text.setText(this.createText(text))
  }

  createText(text = DEFAULT_TEXT) {
    return `The text in input is: ${text || DEFAULT_TEXT}. Edit it!`
  }

  getText() {
    return this.text
  }
}
