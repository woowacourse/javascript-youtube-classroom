function getQueryString(query = {}) {
  return Object.entries(query)
    .map(([key, value]) =>
      value instanceof Array ? `${key}=${value.join(',')}` : `${key}=${value}`
    )
    .join('&');
}

export { getQueryString };
