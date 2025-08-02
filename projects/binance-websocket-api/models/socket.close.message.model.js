import { SocketMessageModel } from '../../../assets/js/models/socket.message.model.js'

export class SocketCloseMessageModel extends SocketMessageModel {
  constructor(datetime = Date.now()) {
    super('Close', { datetime })
  }
}
