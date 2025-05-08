import { HTML, nInput } from '../../../assets/js/libs/afrontend/index.js'

export class InputComponent extends HTML {
  state = {
    label: '',
    value: '',
    type: 'text',
    placeholder: '',
  }

  children = {
    label: new HTML(),
    input: new nInput(),
    error: new HTML(),
  }

  constructor({ label = '', value = '', type = 'text', placeholder = '' } = {}) {
    super()
    this.state.label = label
    this.state.value = value
    this.state.type = type
    this.state.placeholder = label || placeholder
  }

  onCreate() {
    super.onCreate()
    this.append(this.getLabel())
    this.append(this.getInput())
    this.append(this.getError())
  }

  getLabelText(text = this.state.label?.toString()) { return text }

  getLabel(text = this.getLabelText()) {
    if (text) this.children.label.setText(text)
    return this.children.label
  }

  getPlaceholderText(text = this.state.placeholder?.toString()) { return text }

  getValueText(text = this.state.value?.toString()) { return text }

  getTypeText(text = this.state.type?.toString()) { return text }

  getAccepts(accepts = '') { return accepts }

  getInput() {
    this.children.input.setPlaceholder(this.getPlaceholderText())
    this.children.input.setValue(this.getValueText())
    this.children.input.setAttr('type', this.getTypeText())
    this.children.input.setAttr('accepts', this.getAccepts())
    this.children.input.setStyle('margin', '0rem 0rem calc(1rem / 4) 0rem')
    this.children.input.setStyle('padding', 'calc(1rem / 4)')
    this.children.input.setStyle('box-sizing', 'border-box')
    this.children.input.setStyle('width', '100%')
    return this.children.input
  }

  getError() {
    return this.children.error
  }

  getValue() {
    return this.children.input.getValue()
  }

  setValue(value = '') {
    this.children.input.setValue(value)
  }
}
