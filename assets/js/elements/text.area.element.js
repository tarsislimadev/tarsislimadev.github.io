import { Element } from './element.js'

export class TextAreaElement extends Element {
  constructor({ placeholder = '', attrs = {}, styles = {}, container_styles = {}, events = {} } = {}) {
    super({ attrs: { rows: '10', cols: '30', ...attrs }, styles, container_styles, events })
    this.element.setAttribute('placeholder', placeholder)
  }

  getTagName() { return 'textarea' }

  getName() { return 'textarea-element' }

  getValue() { return this.element.value }

  setValue(value) { this.element.value = value }
}
