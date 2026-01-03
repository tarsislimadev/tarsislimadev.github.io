import { RequestModel } from '../../assets/js/models/request.model.js'

export const getRequestModelList = () => Array.from([
  new RequestModel('facebook graph api'),
  new RequestModel('feed story', 'GET', '', []),
  new RequestModel('feed story 2', 'GET', '', []),
]).map((r, ix) => { if (ix != 0) r.params.push('path'); return r })

export const getMethod = (method) => getMethodsList().find(({ name }) => name == method)

export const getMethodQuery = (method) => getMethod(method)?.query
