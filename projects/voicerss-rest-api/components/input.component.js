import { HTML } from '../../../assets/js/libs/afrontend/index.js'
import { nInput } from './input.js'
import { nLabel } from './label.js'

export class InputComponent extends HTML {
  state = {
    label: '',
    value: [],
  }

  label = new nLabel()
  input = new nInput()

  constructor(label, value = []) {
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
    this.label.setStyle('padding', 'calc(1rem / 4)')
    return this.label
  }

  getInput() {
    this.input.setValue(this.state.value)
    return this.input
  }

  getValue() {
    return this.input.getValue()
  }
}
