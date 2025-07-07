import { MessageModel } from './message.model.js'

export class SocketMessageModel extends MessageModel {
  type = 'socket'

  constructor(body, foots = []) {
    super(body, { foots: [Date.now(), ...foots] })
    this.heads = [this.type]
  }
}
