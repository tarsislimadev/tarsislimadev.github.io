import { HTML } from '../../../assets/js/libs/afrontend/index.js'
import { SelectComponent } from '../../../assets/js/components/select.component.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import { getEndpointsList, getInputEndpointsList } from '../lists/endpoints.list.js'
import { InputsComponent } from './inputs.component.js'

const inputs = new InputsComponent()

export class FormComponent extends HTML {
  select = new SelectComponent({ options: getInputEndpointsList().map(({ name }) => ([name, name])) })
  inputs = new HTML()

  onCreate() {
    super.onCreate()
    this.append(this.getSelectComponent())
    this.append(this.getInputs())
  }

  getSelectValue() {
    return this.select.getValue()
  }

  getEndpointByName(name = this.getSelectValue()) {
    return getEndpointsList().find((e) => e.name == name)
  }

  onSelectComponentChange() {
    this.inputs.clear()
    const params = this.getEndpointByName()?.params
    Array.from(params).map((param) => this.inputs.append(inputs.getComponent(param)))
  }

  getSelectComponent() {
    this.select.addEventListener('change', () => this.onSelectComponentChange())
    return this.select
  }

  getInputs() {
    const html = new HTML()
    html.append(this.inputs)
    html.append(new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() }))
    return html
  }

  onSendButtonClick() {
    const name = this.getSelectValue()
    const params = this.getEndpointByName(name)?.params
    const values = Array.from(params).map((param) => [param, inputs.getValue(param)])
    this.dispatch('submit', { name, values })
  }
}
