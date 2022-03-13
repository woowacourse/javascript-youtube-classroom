import WebStore from '../store/WebStore.js';
import { REDIRECT_SERVER_HOST } from '../config/config.js';
import { ERROR_MESSAGES, SAVED_VIDEO } from '../config/constants.js';

const webStore = new WebStore(SAVED_VIDEO.KEY);

export const searchVideos = async (query, nextPageToken = null) => {
  const url = new URL(
    `${process.env.NODE_ENV === 'development' && 'dummy/'}youtube/v3/search`,
    REDIRECT_SERVER_HOST
  );

  const parameters = new URLSearchParams({
    part: 'snippet',
    type: 'video',
    maxResults: 10,
    regionCode: 'kr',
    safeSearch: 'strict',
    pageToken: nextPageToken || '',
    q: query,
  });

  url.search = parameters.toString();

  const res = await fetch(url);
  const body = await res.json();

  if (!res.ok) throw new Error(body.error.message);

  return body;
};

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
