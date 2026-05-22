const base_url = 'https://tarsislimadev.github.io/api/v20260522';

module.exports = {
  fetch: async (endpoint, { method = 'GET', headers: { ...customHeaders }, body = null }) => {
    const response = await fetch(`${base_url}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...customHeaders
      },
      body: body ? JSON.stringify(body) : null
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}