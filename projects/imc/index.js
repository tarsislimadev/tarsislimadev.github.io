import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { getParams } from '../../assets/js/utils/url.js'

export class Page extends PageComponent {
  weight = new InputComponent({ label: 'weight (kg)', value: 80, type: 'number' })
  height = new InputComponent({ label: 'height (m)', value: 1.8, type: 'number' })
  result = new HTML()

  state = { params: getParams({ title: 'IMC' }) }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: this.state.params.title }))
    this.append(this.getBody())
  }

  getBody() {
    const html = new HTML()
    html.setStyle('max-width', '26rem')
    html.append(this.getWeightInput())
    html.append(this.getHeightInput())
    html.append(new ButtonComponent({ text: 'calc imc', onclick: () => this.onImcButtonClick() }))
    html.append(this.getResultHTML())
    return html
  }

  getWeightInput() {
    return this.weight
  }

  getHeightInput() {
    return this.height
  }

  onImcButtonClick() {
    const weight = this.weight.getValue()
    const height = this.height.getValue()
    const imc = this.calcIMC(weight, height)
    this.result.setText(`IMC: ${imc}`)
  }

  getResultHTML() {
    return this.result
  }

  calcIMC(weight = 1, height = 1) {
    return (weight / (height * height)).toFixed(4)
  }
}
