export const getQueryString = (params) => {
  let queryString = '?';
  for (const [key, value] of Object.entries(params)) {
    queryString += `&${key}=${value}`;
  }

  return queryString;
};
