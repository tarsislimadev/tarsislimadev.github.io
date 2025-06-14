import { ApplicationWebSocket } from '../../../assets/js/utils/socket.js'

export class PublicBitgetWebSocket extends ApplicationWebSocket {
  constructor({ onopen = (() => { }), onmessage = (() => { }), onerror = (() => { }), onclose = (() => { }) }) {
    super('wss://ws.bitget.com/v2/ws/public', { onopen, onmessage, onerror, onclose })
  }
}

export class PrivateBitgetWebSocket extends ApplicationWebSocket {
  constructor({ onopen = (() => { }), onmessage = (() => { }), onerror = (() => { }), onclose = (() => { }) }) {
    super('wss://ws.bitget.com/v2/ws/private', { onopen, onmessage, onerror, onclose })
  }
}
