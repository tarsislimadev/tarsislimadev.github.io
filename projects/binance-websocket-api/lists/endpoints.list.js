import { SocketEndpointModel } from '../../../assets/js/models/socket.endpoint.model.js'
import * as BINANCE from '../../../assets/js/apis/rest/binance/v3.js'

export const getEndpointsList = () => Array.from([
  new SocketEndpointModel('input', BINANCE.websocket.name),
  new SocketEndpointModel('input', 'klines', ['symbol', 'interval', 'startTime', 'limit']),
  new SocketEndpointModel('input', 'SUBSCRIBE', ['symbol'])
])

export const getInputEndpointsList = () => Array.from(getEndpointsList().filter(({ side }) => side == 'input'))

export const getOutputEndpointsList = () => Array.from(getEndpointsList().filter(({ side }) => side == 'output'))
