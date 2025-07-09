import { Element } from './element.js'

export class ButtonElement extends Element {
  getTagName() { return 'button' }

  getName() { return 'button-element' }
}
