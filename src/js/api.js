import { YOUTUBE_API_KEY } from './config.js';
import { dummyData } from './dummy.js';
import { sleep } from './utils.js';

export const searchYoutube = async (keyword, pageToken = '') => {
  try {
    const endPoint = `https://www.googleapis.com/youtube/v3/search`;
    const query = getParameters({
      part: 'snippet',
      type: 'video',
      key: YOUTUBE_API_KEY,
      pageToken,
      maxResults: '10',
      q: keyword,
    }).toString();
    const response = await fetch(`${endPoint}?${query}`);

    if (!response.ok) {
      throw Error(`${response.status} 에러가 발생했습니다`);
    }

    return await response.json();
  } catch (error) {
    throw Error(error.message);
  }
};

export const searchYoutubeById = async (ids = []) => {
  if (ids.length <= 0) return;

  try {
    const endPoint = `https://www.googleapis.com/youtube/v3/videos`;
    const query = getParameters({
      part: 'snippet',
      type: 'video',
      key: YOUTUBE_API_KEY,
      id: ids.join(','),
    }).toString();
    const response = await fetch(`${endPoint}?${query}`);

    if (!response.ok) {
      throw Error(`${response.status} 에러가 발생했습니다`);
    }

    return await response.json();
  } catch (error) {
    throw Error(error.message);
  }
};

// TODO: 테스트 코드 - 추후 삭제 요망
export const searchYoutubeDummyData = async (isEmpty = false) => {
  await sleep(500);
  if (isEmpty) {
    return JSON.parse(`
      {
        "kind": "youtube#searchListResponse",
        "etag": "aAoE_May7GgRH79SFKG9Byh3Z_A",
        "regionCode": "KR",
        "pageInfo": {
            "totalResults": 0,
            "resultsPerPage": 0
        },
        "items": []
      }
    `);
  }
  return dummyData[0];
};

const getParameters = function ({ part, type, key, pageToken = '', maxResults = '', q = '', id = '' }) {
  const URLparams = new URLSearchParams({});

  const params = arguments[0];
  Object.keys(params).forEach((key) => {
    if (params[key]) URLparams.set(key, params[key]);
  });

  return URLparams;
};
