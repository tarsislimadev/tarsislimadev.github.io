import { Node } from './node.js'

export class SetNode extends Node {
  get type() { return 'n8n-nodes-base.set' }
  get typeVersion() { return '1.0' }
  name = 'Set'
  parameters = {}
}
