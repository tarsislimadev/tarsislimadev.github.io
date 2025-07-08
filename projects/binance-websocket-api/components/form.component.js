import { Element } from '../../../assets/js/elements/element.js'

import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import { InputsComponent } from './inputs.component.js'

import { getEndpointsList, getInputEndpointsList } from '../lists/endpoints.list.js'

import { dispatchWindowEvent } from '../../../assets/js/utils/window.js'

import { SelectElement } from '../../../assets/js/elements/select.element.js'

const inputs = new InputsComponent()

export class FormComponent extends Element {
  select = new SelectElement({
    options: getInputEndpointsList().map(({ name }) => ([name, name])),
    events: { change: () => this.onSelectComponentChange() }
  })
  inputs = new Element()

  onCreate() {
    super.onCreate()
    this.append(this.select)
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

  getInputs() {
    return new Element({
      children: [
        this.inputs,
        new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() })
      ]
    })
  }

  onSendButtonClick() {
    const name = this.getSelectValue()
    const params = this.getEndpointByName(name)?.params
    const values = Array.from(params).map((param) => [param, inputs.getValue(param)])
    dispatchWindowEvent('submit', { name, values })
  }
}
