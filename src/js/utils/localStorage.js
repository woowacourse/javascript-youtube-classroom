import { ERROR_MESSAGE, RULES } from '../constants';

const LOCALSTORAGE_VIDEO_IDS_KEY = 'VIDEO_IDS';
const LOCALSTORAGE_KEY_VIDEOS = 'VIDEOS';

const getStorageVideoIDs = (key = LOCALSTORAGE_VIDEO_IDS_KEY) =>
  JSON.parse(window.localStorage.getItem(key)) || [];

const setStorageVideoIDs = ({ key = LOCALSTORAGE_VIDEO_IDS_KEY, value }) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const getStorageVideos = ({ key = LOCALSTORAGE_KEY_VIDEOS, filter = 'all' }) => {
  const videos = JSON.parse(window.localStorage.getItem(key)) || { stored: {}, watched: {} };
  return filter === 'all' ? videos : videos[filter];
};

const setStorageVideos = ({ key = LOCALSTORAGE_KEY_VIDEOS, value }) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const removeStorageVideoID = (index) => {
  const newVideoIDs = getStorageVideoIDs().filter((_, idx) => idx !== index);
  setStorageVideoIDs({ value: newVideoIDs });
};

const removeStorageVideo = ({ videoId, filter }) => {
  const { stored, watched } = getStorageVideos({});

  if (filter === 'stored') {
    delete stored[`${videoId}`];
  }

  if (filter === 'watched') {
    delete watched[`${videoId}`];
  }

  const newVideos = { stored, watched };
  setStorageVideos({ value: newVideos });
};
const checkVideoStorageFull = (key = LOCALSTORAGE_VIDEO_IDS_KEY) => {
  if (getStorageVideoIDs(key).length >= RULES.MAX_STORED_IDS_AMOUNT) {
    throw new Error(ERROR_MESSAGE.FULL_STORAGE);
  }
};

export {
  getStorageVideoIDs,
  setStorageVideoIDs,
  LOCALSTORAGE_VIDEO_IDS_KEY,
  LOCALSTORAGE_KEY_VIDEOS,
  checkVideoStorageFull,
  getStorageVideos,
  setStorageVideos,
  removeStorageVideoID,
  removeStorageVideo
};
