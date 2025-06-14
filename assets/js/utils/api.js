import { api_key } from '../../../assets/js/config/googleusercontent/index.js'

import { request, simple_request } from './ajax.js'

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

const getFacebookHeaders = (headers = {}) => ({ ...headers, 'Authorization': `Bearer ${LOCAL.get(['facebook.access_token'])}` })

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
        insert: (params = {}, body = {}) => request('POST', urls.youtube('liveBroadcasts', params), body, { Authorization: `Bearer ${api_key}` }),
      },
      videos: {
        list: (query = {}) => request('GET', urls.youtube('videos', { key: api_key, ...query })),
        mostPopular: () => rest.youtube.v3.videos.list({ chart: 'mostPopular' }),
        chartUnspecified: () => rest.youtube.v3.videos.list({ chart: 'chartUnspecified' })
      },
      captions: {
        list: (videoId, query = {}) => request('GET', urls.youtube('captions', { key: api_key, videoId, ...query })),
        download: (id, query = {}) => request('GET', 'captions/' + id, { key: api_key, id, ...query })
      },
      search: {
        list: (query = {}) => request('GET', urls.youtube('search', { key: api_key, ...query }))
      }
    }
  },
  gmail: {
    v1: {
      users: {
        getProfile: (userId = 'me') => request('GET', `https://gmail.googleapis.com/gmail/v1/users/${userId}/labels`, null, getGmailHeader())
      }
    }
  },
  graph_facebook: {
    v22_0: {
      call: (method, path, search = {}, body = null, headers = {}) => simple_request({ headers: getFacebookHeaders(headers), method, protocol: 'https:', hostname: 'graph.facebook.com', pathname: `/v22.0/${path}`, search, body })
    }
  }
}
