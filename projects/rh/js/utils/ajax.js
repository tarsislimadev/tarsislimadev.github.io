import * as CONFIG from './config.js'

class Response {
  status = 'ok'
  message = null
  data = {}

  constructor({ responseText = '{}', status }) {
    this.status = status
    this.message = ''
    this.data = JSON.parse(responseText)
  }

  getStatus() {
    return this.status
  }

  getMessage() {
    return this.message
  }

  getData() {
    return this.data || {}
  }

  get(key) {
    return this.getData()[key] || null
  }
}

class SuccessResponse extends Response { }

class ErrorResponse extends Response { }

export const request = (method = 'GET', paths = [], data = {}) => new Promise((res, rej) => {
  const url = [CONFIG.servers['default'].url, ...paths].join('/')

  const xhr = new XMLHttpRequest()
  xhr.open(method, url, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
  xhr.setRequestHeader('Access-Control-Allow-Headers', '*')

  const onComplete = () => xhr.status === 200
    ? res(new SuccessResponse(xhr))
    : rej(new ErrorResponse(xhr))

  xhr.onload = () => onComplete()
  xhr.onerror = () => onComplete()
  xhr.send(JSON.stringify(data))
})

export const post = (paths = [], data = {}) => request('POST', paths, data)
