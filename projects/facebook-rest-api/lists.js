import { RequestModel } from '../../assets/js/models/request.model.js'

const url = (path) => path

export const getRequestModelList = () => Array.from([
  new RequestModel('facebook graph api'),
  new RequestModel('tracking.url.get', 'GET', url('tracking.url.get'), [], ['domain', 'format'], []),
  new RequestModel('catalogue.dump.get', 'GET', url('catalogue.dump.get'), [], [], []),
]).map((r, ix) => { if (ix != 0) r.query.push('apikey'); return r })

export const getMethod = (method) => getMethodsList().find(({ name }) => name == method)

export const getMethodQuery = (method) => getMethod(method)?.query
