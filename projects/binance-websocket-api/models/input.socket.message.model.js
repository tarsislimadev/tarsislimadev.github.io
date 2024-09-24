import * as Messages from '../../../assets/js/models/input.socket.message.model.js'

export class InputSocketMessageModel extends Messages.InputSocketMessageModel {
  toJSON() {
    const { Id: id, Endpoint: method, Payload: params } = this

    return { id, method, params }
  }
}
