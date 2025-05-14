import { Node } from './node.js'

export class GoogleSheetsNode extends Node {
  get type() { return 'n8n-nodes-base.googleSheets' }
  get typeVersion() { return '1.0' }
  name = 'Google Sheets'
  parameters = {}
}
