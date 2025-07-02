import { Element } from './element.js'
import { TextElement } from './text.element.js'

export class TextButtonElement extends Element {
  constructor({ text = '', onclick = (() => { }), attrs = {}, styles = {}, container_styles = {}, events = {} } = {}) {
    super({
      children: [new TextElement({ text })],
      attrs, container_styles,
      events: { click: onclick, ...events },
      styles: { padding: '1rem', ...styles },
    })
  }

  getTagName() { return 'button' }

  getName() { return 'text-button-element' }
}
