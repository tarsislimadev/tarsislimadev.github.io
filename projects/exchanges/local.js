export const write = (keys, value = {}) => {
  localStorage.setItem(keys.join('.'), JSON.stringify(value))
}

export const read = (keys) => {
  return JSON.parse(localStorage.getItem(keys.join('.')))
}
