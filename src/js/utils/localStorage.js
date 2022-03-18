import { ERROR_MESSAGE, RULES } from '../constants';

const LOCALSTORAGE_VIDEO_IDS_KEY = 'VIDEO_IDS';
const LOCALSTORAGE_KEY_VIDEOS = 'VIDEOS';

const getStorageVideoIDs = (key = LOCALSTORAGE_VIDEO_IDS_KEY) =>
  JSON.parse(window.localStorage.getItem(key)) || [];

const setStorageVideoIDs = ({ key = LOCALSTORAGE_VIDEO_IDS_KEY, value }) => {
  // const newVideoIDs = [
  //   ...getStorageVideoIDs(key),
  //   value,
  // ];

  window.localStorage.setItem(key, JSON.stringify(value));
};

const getStorageVideos = (key = LOCALSTORAGE_KEY_VIDEOS) =>
  JSON.parse(window.localStorage.getItem(key)) || [];

const setStorageVideos = ({ key = LOCALSTORAGE_KEY_VIDEOS, value }) => {
  // const newVideos = [
  //   ...getStorageVideos(key),
  //   value,
  // ];
  window.localStorage.setItem(key, JSON.stringify(value));
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
  setStorageVideos
};
