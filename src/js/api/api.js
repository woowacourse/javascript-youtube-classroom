const BASE_URL =
  'https://trusting-bardeen-f1fc38.netlify.app/youtube/v3/search';
const OPTIONS = {
  part: 'snippet',
  type: 'video',
  maxResults: 10,
};

export const getSearchAPI = (query, nextPageToken = null) => {
  const url = `${BASE_URL}?${spreadOptions({
    ...OPTIONS,
    q: makeQueryFormal(query),
    nextPageToken,
  })}`;

  return fetch(url)
    .then((res) => res.json())
    .catch((err) => err);
};

function spreadOptions(options) {
  return Object.keys(options)
    .map((key) => options[key] && `&${key}=${options[key]}`)
    .join('')
    .slice(1);
}

function makeQueryFormal(query) {
  return query.trim().replace(/\s/g, ' ').replace(/\s/g, '+');
}
