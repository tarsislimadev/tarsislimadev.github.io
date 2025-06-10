// 

export const websocket = {
  name: 'binance websocket api',
  url: 'wss://ws-api.binance.com:443/ws-api/v3',
  docs: 'https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api',
}

export class BinanceWebSocket extends WebSocket {
  constructor() { super(websocket.url) }
}

const createURLParams = (params) => params ? ('?' + (new URLSearchParams(params)).toString()) : ''

const createURL = (hostAndPath, params = {}) => new URL(hostAndPath + createURLParams(params)).toString()

const getJSON = (url, params = {}) => fetch(createURL(url, params)).then(res => res.json())

export class BinanceSpotApiV3 {
  static BASE_URL = 'https://api1.binance.com/api/v3'

  static getJSON(path, params = {}) {
    return getJSON(BinanceSpotApiV3.BASE_URL + '/' + path, params)
  }

  static getTickerPrice({ symbols = [] } = {}) {
    return BinanceSpotApiV3.getJSON('ticker/price', { symbols: `[${symbols.map((s) => `"${s}"`).join(',')}]` })
  }
}
