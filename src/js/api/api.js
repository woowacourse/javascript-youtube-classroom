const BASE_URL =
  'https://trusting-bardeen-f1fc38.netlify.app/youtube/v3/search';
const OPTIONS = {
  part: 'snippet',
  type: 'video',
  maxResults: 10,
  q: null,
  pageToken: '',
};

export const getSearchAPI = async (query, pageToken = '') => {
  const url = new URL(BASE_URL);
  const parameters = new URLSearchParams({
    ...OPTIONS,
    q: encodeQuery(query),
    pageToken,
  });
  url.search = parameters.toString();

  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    return [null, data];
  }

  return [{ message: data.error.message, statusCode: response.status }, null];
};

function encodeQuery(query) {
  return query
    .trim()
    .replace(/\s/g, '+') // 공백은 +로 바꿔준다.
    .replace(/[^ㄱ-ㅎ|가-힣]/g, match => encodeURIComponent(match)); // 한글은 제외하고, encode
}
