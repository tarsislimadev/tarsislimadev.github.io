import { Element } from './element.js'
import { OptionElement } from './option.element.js'

export class SelectElement extends Element {
  constructor({ options = [], attrs = [], styles = {}, container_styles = {}, events = {} } = {}) {
    super({ children: options.map(([key, value]) => new OptionElement({ key, value })), attrs, styles, container_styles, events })
  }

  getTagName() { return 'select' }

  getName() { return 'select-element' }  

  getValue() { return this.element.value }

  setValue(value) { return this.element.value = value }
}
