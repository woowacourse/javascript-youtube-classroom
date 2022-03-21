import 'regenerator-runtime/runtime.js';
import { LOAD_VIDEOS_COUNT } from '../constant';

export const BASE_URL =
  'https://trusting-bardeen-f1fc38.netlify.app/youtube/v3/search';
export const OPTIONS = {
  part: 'snippet',
  type: 'video',
  maxResults: `${LOAD_VIDEOS_COUNT}`,
  q: null,
  pageToken: '',
};

export const getSearchAPI = async (
  query,
  pageToken = '',
  requestMockData = null
) => {
  if (requestMockData) {
    const mockData = await requestMockData;
    return [null, mockData];
  }

  const url = new URL(BASE_URL);
  const parameters = new URLSearchParams({
    ...OPTIONS,
    q: encodeQuery(query),
    pageToken,
  });
  url.search = parameters.toString();

  const response = await fetch(url);

  console.log('response', response);
  const data = await response.json();

  console.log('data', data);
  console.log('data.stringify()', JSON.stringify(data));
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
