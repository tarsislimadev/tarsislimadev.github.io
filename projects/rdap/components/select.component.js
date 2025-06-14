import { HTML } from '../../../assets/js/libs/afrontend/index.js'
import { nSelect } from './select.js'
import { nLabel } from './label.js'

export class SelectComponent extends HTML {
  state = {
    label: '',
    values: [],
  }

  constructor(label, values = []) {
    super()
    this.state.label = label
    this.state.values = values
  }

  label = new nLabel()
  select = new nSelect()

  onCreate() {
    super.onCreate()
    this.append(this.getLabel())
    this.append(this.getSelect())
  }

  getLabel() {
    this.label.setText(this.state.label)
    return this.label
  }

  getSelect() {
    Array.from(this.state.values).map((v) => this.select.addOption(v, v))
    return this.select
  }

  getValue() {
    return this.select.getValue()
  }
}
