import { HTML, nSelect } from '../../../assets/js/libs/afrontend/index.js'

export class SelectComponent extends HTML {
  state = { label: '', options: [] }

  children = {
    label: new HTML(),
    input: new nSelect(),
    error: new HTML(),
  }

  constructor({ label = '', options = [['empty', null]] } = {}) {
    super()
    this.state.label = label
    this.state.options = options
  }

  getName() { return 'select-component' }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(this.getLabel())
    this.append(this.getInput())
    this.append(this.getError())
  }

  setEvents() {
    this.children.input.addEventListener('change', () => this.dispatch('change'))
  }

  getLabel() {
    this.children.label.setStyle('margin', '0rem 0rem calc(1rem / 4) 0rem')
    this.children.label.setText(this.state.label)
    Array.from(this.state.options).map(([key, value = '']) => this.addOption(key, value))
    return this.children.label
  }

  getInput() {
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
    return this.getInput().getValue()
  }

  addOption(key, value = '') {
    this.children.input.addOption(key, value)
    return this
  }
}
