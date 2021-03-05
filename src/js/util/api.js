import { NUM_OF_CLIP_PER_FETCH } from '../constants/index.js';
import { YOUTUBE_API_KEY } from '../../../env.js';

const END_POINT = 'https://www.googleapis.com/youtube/v3';

export const getSearchVideoByKeyword = async (keyword, pageToken = '') => {
  return await fetch(
    `${END_POINT}/search?part=snippet&q=${keyword}&maxResults=${NUM_OF_CLIP_PER_FETCH}&type=video&videoEmbeddable=true&pageToken=${pageToken}&key=${YOUTUBE_API_KEY}`
  ).then(Response => Response.json());
};

export const getVideoByIdList = async idList => {
  return await fetch(`${END_POINT}/videos?part=snippet&id=${idList.join(',')}&key=${YOUTUBE_API_KEY}`).then(Response =>
    Response.json()
  );
};
