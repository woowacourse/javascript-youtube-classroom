import { NUM_OF_VIDEO_PER_FETCH } from '../constants/index.js';

const END_POINT = 'https://jolly-lalande-122025.netlify.app';

const HttpRequest = async url => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`${response.status}: http request error!`);
    }

    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getSearchVideoByKeyword = async (keyword, pageToken = '') => {
  const searchURL = new URL('/.netlify/functions/youtube/search', END_POINT);
  const params = new URLSearchParams({
    part: 'snippet',
    q: keyword,
    maxResults: NUM_OF_VIDEO_PER_FETCH,
    type: 'video',
    videoEmbeddable: true,
    pageToken,
  });
  searchURL.search = params.toString();

  return await HttpRequest(searchURL.href);
};

export const getVideoByIdList = async idList => {
  const videoURL = new URL('/.netlify/functions/youtube/videos', END_POINT);
  const params = new URLSearchParams({
    part: 'snippet',
    id: Array.isArray(idList) ? idList.join(',') : idList,
  });
  videoURL.search = params.toString();

  return await HttpRequest(videoURL.href);
};
