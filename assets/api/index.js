const base_url = 'http://20.75.92.141/api/v20260522';

export default {
  fetch: async (endpoint, { method = 'GET', headers = {}, body = null } = {}) => {
    const response = await fetch(`${base_url}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : null
    });
    return response.json();
  }
}
