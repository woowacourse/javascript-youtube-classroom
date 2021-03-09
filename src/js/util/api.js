import { NUM_OF_VIDEO_PER_FETCH } from '../constants/index.js';
import { YOUTUBE_API_KEY } from '../../../env.js';

const END_POINT = 'https://www.googleapis.com/';

export const getSearchVideoByKeyword = async (keyword, pageToken = '') => {
  const searchURL = new URL('/youtube/v3/search', END_POINT);
  const params = new URLSearchParams({
    part: 'snippet',
    q: keyword,
    maxResults: NUM_OF_VIDEO_PER_FETCH,
    type: 'video',
    videoEmbeddable: true,
    pageToken,
    key: YOUTUBE_API_KEY,
  });
  searchURL.search = params.toString();

  return await fetch(searchURL.href).then(Response => Response.json());
};

export const getVideoByIdList = async idList => {
  const videoURL = new URL('/youtube/v3/videos', END_POINT);
  const params = new URLSearchParams({
    part: 'snippet',
    id: idList.join(','),
    key: YOUTUBE_API_KEY,
  });
  videoURL.search = params.toString();

  return await fetch(videoURL.href).then(Response => Response.json());
};
