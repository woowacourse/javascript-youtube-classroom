const BASE_URL =
  'https://trusting-bardeen-f1fc38.netlify.app/youtube/v3/search';
const OPTIONS = {
  part: 'snippet',
  type: 'video',
  maxResults: 10,
};

export const getSearchAPI = async (query, nextPageToken = null) => {
  const url = `${BASE_URL}?${spreadOptions({
    ...OPTIONS,
    q: encodeQuery(query),
    nextPageToken,
  })}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response.json();
};

function spreadOptions(options) {
  return Object.keys(options)
    .map((key) => options[key] && `&${key}=${options[key]}`)
    .join('')
    .slice(1);
}

function encodeQuery(query) {
  return query
    .trim()
    .replace(/\s/g, '+') // 공백은 +로 바꿔준다.
    .replace(/[^ㄱ-ㅎ|가-힣]/g, (match) => encodeURIComponent(match)); // 한글은 제외하고, encode
}
