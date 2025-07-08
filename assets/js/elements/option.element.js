import { Element } from './element.js'

export class OptionElement extends Element {
  constructor({ key, value = null, attrs = [], styles = {}, container_styles = {}, events = {} } = {}) {
    super({ attrs: { key, ...attrs }, styles, container_styles, events })
    this.setText(value || key)
  }

  getTagName() { return 'option' }

  getName() { return 'option-element' }
}
