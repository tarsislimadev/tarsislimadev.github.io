import { Node } from './node.js'

export class NoOpNode extends Node {
  get type() { return 'n8n-nodes-base.noOp' }
  get typeVersion() { return '1.0' }
  name = 'No Operations'
  parameters = {}
}
