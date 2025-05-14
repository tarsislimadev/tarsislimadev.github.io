import { ScheduleTriggerNode } from '../models/scheduleTrigger.node.js'
import { GoogleSheetsNode } from '../models/googleSheets.node.js'
import { HttpRequestNode } from '../models/httpRequest.node.js'
import { CodeNode } from '../models/code.node.js'
import { SetNode } from '../models/set.node.js'
import { TelegramNode } from '../models/telegram.node.js'
import { NoOpNode } from '../models/noOp.node.js'

export const nodes = {
  'n8n-nodes-base.scheduleTrigger': () => new ScheduleTriggerNode(),
  'n8n-nodes-base.googleSheets': () => new GoogleSheetsNode(),
  'n8n-nodes-base.httpRequest': () => new HttpRequestNode(),
  'n8n-nodes-base.code': () => new CodeNode(),
  'n8n-nodes-base.set': () => new SetNode(),
  'n8n-nodes-base.telegram': () => new TelegramNode(),
  'n8n-nodes-base.noOp': () => new NoOpNode(),
}

export function getNodeByTypeId(id) {
  if (typeof (nodes[id]) === 'function') {
    return nodes[id]()
  }

  throw new Error('node not found')
}
