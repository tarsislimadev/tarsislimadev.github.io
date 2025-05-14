import { Node } from './node.js'

export class CodeNode extends Node {
  get type() { return 'n8n-nodes-base.code' }
  get typeVersion() { return '1.0' }
  name = 'Code'
  parameters = {}
}
