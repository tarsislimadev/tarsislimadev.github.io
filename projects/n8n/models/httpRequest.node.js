import { Node } from './node.js'

export class HttpRequestNode extends Node {
  get type() { return 'n8n-nodes-base.httpRequest' }
  get typeVersion() { return '1.0' }
  name = 'HTTP Request'
  parameters = {
    method: 'GET',
    path: '/',
    host: 'example.com',
    port: 80,
    protocol: 'http:',
    search: {},
    user: null,
    password: null,
  }
}
