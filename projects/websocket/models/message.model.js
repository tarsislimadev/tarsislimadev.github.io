import { Model } from './model.js'

export class MessageModel extends Model {
  body = null
  heads = []
  foots = []

  constructor(body, { heads = [], foots = [] } = {}) {
    super()
    this.body = body
    this.heads = heads
    this.foots = foots
  }
}
