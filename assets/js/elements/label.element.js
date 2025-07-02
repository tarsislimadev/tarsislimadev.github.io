import { Element } from './element.js'

export class LabelElement extends Element {
  constructor({ text = '' } = {}) {
    super({})
    this.setText(text)
  }
}
