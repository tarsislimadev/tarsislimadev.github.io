import { TextComponent } from '../../../assets/js/components/text.component.js'

export class Node {
  get type() { return 'node' }
  get typeVersion() { return '1.0' }
  get icon() { return this.type }
  name = ''
  parameters = {}

  getComponent() {
    return new TextComponent({ text: this.name + ' v' + this.typeVersion })
  }
}
