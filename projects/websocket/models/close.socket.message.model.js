import { SocketMessageModel } from './socket.message.model.js'

export class CloseSocketMessageModel extends SocketMessageModel {
  type = 'close'
}
