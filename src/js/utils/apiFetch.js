import { NUM } from '../../const/consts.js';

const getParams = (keyword, pageToken) =>
  new URLSearchParams({
    part: 'snippet',
    type: 'video',
    maxResults: NUM.VIDEO_ITEMS_FOR_UNIT,
    regionCode: 'kr',
    q: keyword,
    pageToken: pageToken || '',
  }).toString();

export const fetchDataFromKeyword = async (keyword, pageToken = '') => {
  const BASE_URL = 'https://unruffled-lichterman-7ed5f9.netlify.app/youtube/v3/';
  try {
    const res = await fetch(`${BASE_URL}search?${getParams(keyword, pageToken)}`);
    if (!res.ok) {
      throw new Error(`에러코드: ${res.status}`);
    }
    return res.json();
  } catch (e) {
    console.error(e);
  }
};
