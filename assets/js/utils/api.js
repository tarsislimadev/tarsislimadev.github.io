import GOOGLE from '../../../assets/js/config/googleusercontent/index.js'

import { request } from './ajax.js'

import * as LOCAL from '../../../assets/js/utils/local.js'

const url = (url, query = {}) => {
  const nUrl = new URL(url)
  Object.keys(query).map((q) => nUrl.searchParams.set(q, query[q]))
  return nUrl.toString()
}

export const urls = {
  youtube: (pathname, params = {}) => url('https://www.googleapis.com/youtube/v3/' + pathname, params)
}

const getGmailHeader = () => ({ 'Authorization': `Bearer ${LOCAL.get(['google.access_token'])}` })

const getFacebookHeaders = () => ({ 'Authorization': `Bearer ${LOCAL.get(['facebook.access_token'])}` })

export const rest = {
  musixmatch: {
    v1: {
      call: (method, path, params = {}) => request(method, url('https://api.musixmatch.com/ws/1.1/' + path, params), {}, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Request-Headers': '*' })
    }
  },
  newsapi: {
    v2: {
      call: (path, params = {}) => request('GET', url('https://newsapi.org/v2/' + path, params)),
    }
  },
  youtube: {
    v3: {
      liveBroadcasts: {
        insert: (params = {}, body = {}) => request('POST', urls.youtube('liveBroadcasts', params), body, { Authorization: `Bearer ${GOOGLE.api_key}` }),
      }
    }
  },
  gmail: {
    v1: {
      users: {
        getProfile: () => request('GET', 'https://gmail.googleapis.com/gmail/v1/users/me/profile', null, getGmailHeader())
      }
    }
  },
  graph_facebook: {
    v22_0: {
      call: (method, path, params = {}, headers = {}) => request(method, url('https://graph.facebook.com/v22.0/' + path, params), null, getFacebookHeaders(headers)),
    }
  }
}
