import { HTML } from '../../../assets/js/libs/afrontend/index.js'

export class InputsComponent extends HTML {
  components = {}

  getComponent(component = '') {
    return this.components[component]
  }

  getValue(component = '') {
    return this.getComponent(component)?.getValue()
  }
}
