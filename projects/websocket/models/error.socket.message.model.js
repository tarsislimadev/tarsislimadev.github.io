import { SocketMessageModel } from './socket.message.model.js'

export class ErrorSocketMessageModel extends SocketMessageModel {
  type = 'error'

  constructor(error = new Error('undefined error')) {
    super(error.message.toString())
  }
}
