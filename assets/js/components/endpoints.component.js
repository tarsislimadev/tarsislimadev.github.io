import { HTML } from '../../../assets/js/libs/afrontend/index.js'
import { SelectComponent } from './select.component.js'
import { ButtonComponent } from './button.component.js'
import { InputsComponent } from './inputs.component.js'

export class EndpointsComponent extends HTML {
  children = {
    select: new SelectComponent({}),
    form: new HTML(),
    inputs: new InputsComponent(),
  }

  state = {
    endpoints: [],
  }

  constructor(endpoints = [], inputs = new InputsComponent()) {
    super()
    this.state.endpoints = endpoints
    this.inputs = inputs
  }

  getName() { return 'endpoints-component' }

  onCreate() {
    super.onCreate()
    this.append(this.getEndpointsSelect())
    this.append(this.getForm())
    this.append(new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() }))
  }

  getEndpointsSelect() {
    Array.from(this.state.endpoints).map(({ name }) => this.children.select.addOption(name, name))
    this.children.select.addEventListener('change', () => this.onEndpointsSelectChange())
    return this.children.select
  }

  onEndpointsSelectChange() {
    this.children.form.clear()
    this.getEndpointInputs().map((i) => this.children.form.append(i))
  }

  getEndpointInputs(endpoint = this.children.select.getValue()) {
    const { params,  query } = this.getEndpoint(endpoint)
    return Array.from(params).concat(query).map((q) => (this.inputs.getComponent(q)))
  }

  getForm() {
    return this.children.form
  }

  onSendButtonClick() {
    const endpoint = this.getEndpoint()
    const query = this.getEndpointQuery()
    const params = this.getEndpointParams()
    this.dispatch('send', { endpoint, query, params })
  }

  getEndpoint(endpoint = this.children.select.getValue()) {
    return Array.from(this.state.endpoints).find(({ name }) => name == endpoint)
  }

  getEndpointQuery(endpoint = this.children.select.getValue()) {
    const { query } = this.getEndpoint(endpoint)
    return Array.from(query).reduce((params, q) => ({ ...params, [q]: this.inputs.getValue(q) }), {})
  }

  getEndpointParams(endpoint = this.children.select.getValue()) {
    const { params } = this.getEndpoint(endpoint)
    return Array.from(params).reduce((params, q) => ({ ...params, [q]: this.inputs.getValue(q) }), {})
  }

}
