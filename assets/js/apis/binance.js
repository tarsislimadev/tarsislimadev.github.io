// 

export const websocket = {
  name: 'binance websocket api',
  url: 'wss://ws-api.binance.com:443/ws-api/v3',
  docs: 'https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api',
}

export class BinanceWebSocket extends WebSocket {
  constructor() { super(websocket.url) }
}
