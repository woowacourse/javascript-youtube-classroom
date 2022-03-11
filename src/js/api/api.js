import { YOUTUBE_API_KEY } from '../../../api_key.js';
import { searchVideosMock } from '../__mocks__/api.js';
import WebStore from '../store/WebStore.js';
import { API_SERVER } from '../config/config.js';
import {
  QUERY_OPTIONS,
  ERROR_MESSAGES,
  SAVED_VIDEO,
} from '../config/constants.js';

const webStore = new WebStore(SAVED_VIDEO.KEY);

const searchVideosWithAPI = (query, nextPageToken = null) => {
  const options = QUERY_OPTIONS.SEARCH;
  const spreadQuery = `part=${
    options.part
  }&q=${query}&key=${YOUTUBE_API_KEY}&type=${options.type}&maxResults=${
    options.maxResults
  }${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
  const url = `${API_SERVER}/search?${spreadQuery}`;

  return fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }

    throw new Error(ERROR_MESSAGES.REQUEST_FAIL);
  });
};

// export const searchVideos =
//   process.env.NODE_ENV === 'development'
//     ? searchVideosMock
//     : searchVideosWithAPI;

export const searchVideos = searchVideosWithAPI;

export const getSavedVideos = () => {
  return webStore.load();
};

export const saveVideo = (videoId) => {
  const prevSavedVideos = webStore.load();

  if (prevSavedVideos.length >= SAVED_VIDEO.SAVE_LIMIT)
    throw new Error(ERROR_MESSAGES.SAVED_VIDEOS_OUT_OF_LIMIT);

  const duplicatedRemoved = Array.from(new Set([...prevSavedVideos, videoId]));

  webStore.save(duplicatedRemoved);
};
