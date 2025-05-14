import { Node } from './node.js'
import { IntervalEnum } from '../enums/interval.js'

export class ScheduleTriggerNode extends Node {
  get type() { return 'n8n-nodes-base.scheduleTrigger' }
  get typeVersion() { return '1.0' }
  name = 'Schedule Trigger'
  parameters = {
    interval: IntervalEnum.MINUTES_1
  }
}
