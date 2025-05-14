import { Node } from './node.js'

export class TelegramNode extends Node {
  get type() { return 'n8n-nodes-base.telegram' }
  get typeVersion() { return '1.0' }
  name = 'Telegram'
  parameters = {}
}
