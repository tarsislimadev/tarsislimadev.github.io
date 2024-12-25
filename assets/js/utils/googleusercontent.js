import api_key from './googleusercontent/api_key.js'

export const scope = 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtube.force-ssl'

export const discovery = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'

export const response_type = 'token'

import client_id from './googleusercontent/client_id.js'

export const project_id = 'brtmvdl'

export const auth_uri = 'https://accounts.google.com/o/oauth2/auth'

export const token_uri = 'https://oauth2.googleapis.com/token'

export const auth_provider_x509_cert_url = 'https://www.googleapis.com/oauth2/v1/certs'

export const redirect_uris = ['http://localhost:8080/pages/login/']

export const javascript_origins = ['http://localhost:8080']

export const redirect_uri = redirect_uris.find((url) => (new URL(window.location)).host == (new URL(url)).host)

export default { scope, response_type, client_id, project_id, auth_uri, token_uri, auth_provider_x509_cert_url, redirect_uri }
