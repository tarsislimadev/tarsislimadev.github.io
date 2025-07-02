import { Element } from './element.js'

export class TextElement extends Element {
  constructor({ text = '', attrs = {}, styles = {}, container_styles = {}, events = {} } = {}) {
    super({ attrs, container_styles, events, styles, })
    this.setText(text)
  }
}
