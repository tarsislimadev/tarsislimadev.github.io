export const goTo = (page, params = {}) => {
  const url = new URL(window.location)
  url.pathname = page
  Object.keys(params).map((key) => url.searchParams.append(key, params[key]))
  ;; (window.location = url.toString())
  return url
}
