import { HTML, nSelect, nButton } from '../../../assets/js/libs/afrontend/index.js'
import { getProductList } from '../utils/lists.js'

export class FormComponent extends HTML {
  select = new nSelect()
  inputs = new HTML()

  onCreate() {
    super.onCreate()
    this.append(this.getSelect())
    this.append(this.getInputs())
    this.append(this.getButton())
  }

  getSelect() {
    Array.from(getProductList()).map((item) => this.select.addOption(item, item))
    this.select.addEventListener('change', () => this.onSelectChange())
    this.select.setContainerStyle('padding', '1rem')
    this.select.setStyle('background-color', 'transparent')
    this.select.setStyle('padding', '1rem')
    this.select.setStyle('border', 'none')
    this.select.setStyle('width', '10rem')
    return this.select
  }

  onSelectChange() {
    this.dispatch('change', this.select.getValue())
  }

  getInputs() {
    return this.inputs
  }

  getButton() {
    const button = new nButton()
    button.setContainerStyle('padding', '1rem')
    button.setStyle('padding', '1rem')
    button.setStyle('width', '10rem')
    button.setText('start')
    button.addEventListener('click', () => this.onButtonClick())
    return button
  }

  onButtonClick() {
    this.dispatch('start', this.select.getValue())
  }
}
