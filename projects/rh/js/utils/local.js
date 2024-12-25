export const set = (key, value = {}) => localStorage.setItem(key, JSON.stringify(value))

export const get = (key, def = '{}') => JSON.parse(localStorage.getItem(key) || def)
