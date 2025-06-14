import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { InputComponent } from '../../assets/js/components/input.component.js'

export class Page extends HTML {
  input = new InputComponent('Phone Number')

  onCreate() {
    this.setStyles()
    this.append(this.getInput())
  }

  setStyles() {
    this.setStyle('margin', '0 auto')
    this.setStyle('width', '10rem')
  }

  getInput() {
    this.input.input.addEventListener('input', () => this.onInput())
    return this.input
  }

  onInput() {
    const value = this.input.input.getValue()
      .replace(/\W+/ig, '')
      .replace(/(.?.?)(.?.?.?.?)(.?.?.?.?.?)/, '($1) $2-$3')
    this.input.input.setValue(value)
    console.log('value', value, value.length)
  }
}
