import { NUM_OF_VIDEO_PER_FETCH } from '../constants/index.js';

const END_POINT = 'https://yungo1846-youtube-demo.netlify.app/';

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

  return await fetch(searchURL.href).then(Response => Response.json());
};

export const getVideoByIdList = async idList => {
  const videoURL = new URL('/.netlify/functions/youtube/videos', END_POINT);
  const params = new URLSearchParams({
    part: 'snippet',
    id: idList.join(','),
  });
  videoURL.search = params.toString();

  return await fetch(videoURL.href).then(Response => Response.json());
};
