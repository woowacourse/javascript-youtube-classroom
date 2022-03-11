import { YOUTUBE_API_KEY } from '../../../api_key.js';
import { searchVideosMock } from '../__mocks__/api.js';
import WebStore from '../store/WebStore.js';
import LocalStorageMock from '../__mocks__/LocalStorageMock.js';

const webStore = new WebStore('savedVideos');

const API_SERVER = 'https://www.googleapis.com/youtube/v3';
const QUERY_OPTIONS = {
  SEARCH: {
    part: 'snippet',
    type: 'video',
    maxResults: 10,
  },
};

export const searchVideos = (query, nextPageToken = null) => {
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

    throw new Error('API 요청에 실패했습니다.');
  });
};

export const getSavedVideos = () => {
  return webStore.load();
};

export const saveVideo = (videoId) => {
  const prevSavedVideos = webStore.load();

  if (prevSavedVideos.length >= 100)
    throw new Error('영상은 100개까지 저장할 수 있습니다.');

  const duplicatedRemoved = Array.from(new Set([...prevSavedVideos, videoId]));

  webStore.save(duplicatedRemoved);
};
