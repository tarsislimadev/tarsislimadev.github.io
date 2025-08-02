import { SocketMessageModel } from '../../../assets/js/models/socket.message.model.js'

export class SocketOpenMessageModel extends SocketMessageModel {
  constructor(datetime = Date.now()) {
    super('Open', { datetime })
  }
}
