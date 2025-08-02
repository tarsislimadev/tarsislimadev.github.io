export class BinanaceWebSocket extends WebSocket {
  messages = []

  constructor({
    onopen = (() => { }),
    onmessage = (() => { }),
    onerror = (() => { }),
    onclose = (() => { }),
  } = {}) {
    super('wss://ws-api.binance.com:443/ws-api/v3')

    this.addEventListener('open', onopen)
    this.addEventListener('message', onmessage)
    this.addEventListener('error', onerror)
    this.addEventListener('close', onclose)
  }
}
