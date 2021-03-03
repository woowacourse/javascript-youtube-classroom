import { YOUTUBE_API_KEY } from './config.js';
import { dummyData } from './dummy.js';
import { sleep } from './utils.js';

export const searchYoutube = async (keyword, pageToken = '') => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${keyword}&pageToken=${pageToken}&maxResults=10&key=${YOUTUBE_API_KEY}`
  );

  return response.json();
};

export const searchYoutubeById = async (ids = []) => {
  if (ids.length <= 0) return;
  const idsListString = ids.join(',');
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&type=video&key=${YOUTUBE_API_KEY}&id=${idsListString}`
  );

  return response.json();
};

// TODO: 테스트 코드 - 추후 삭제 요망
export const searchYoutubeDummyData = async (isEmpty) => {
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
