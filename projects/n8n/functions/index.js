import { ScheduleTriggerNode } from '../models/scheduleTrigger.node.js'

export const nodes = {
  'n8n-nodes-base.scheduleTrigger': () => new ScheduleTriggerNode(),
}

export function getNodeByTypeId(id) {
  if (typeof (nodes[id]) === 'function') {
    return nodes[id]()
  }

  throw new Error('node not found')
}
