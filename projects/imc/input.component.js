import { HTML, nInput } from '../../assets/js/libs/afrontend/index.js'
import { getParams } from './params.js'

export class InputComponent extends HTML {
  label = new HTML()
  input = new nInput()

  state = {
    label: '',
    value: '',
    params: getParams()
  }

  constructor(label = '', value = '') {
    super()
    this.state.label = label
    this.state.value = value
  }

  onCreate() {
    super.onCreate()
    this.append(this.getLabel())
    this.append(this.getInput())
  }

  getLabel() {
    this.label.setText(this.state.label)
    // this.label.setStyle('margin', 'calc(1rem / 4) 0')
    return this.label
  }

  getInput() {
    this.input.setValue(this.state.value)
    this.input.setPlaceholder(this.state.label)
    this.input.setStyle('background-color', this.state.params.bgcolor)
    this.input.setStyle('box-shadow', '0rem 0rem 0rem 1px #000000')
    this.input.setStyle('color', this.state.params.color)
    // this.input.setStyle('margin', 'calc(1rem / 4) 0')
    this.input.setStyle('box-sizing', 'border-box')
    this.input.setStyle('display', 'inline-block')
    this.input.setStyle('border', 'none')
    this.input.setStyle('width', '100%')
    return this.input
  }

  getValue() {
    return this.input.getValue()
  }
}
