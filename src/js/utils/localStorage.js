import { ERROR_MESSAGE, RULES } from '../constants';

const LOCALSTORAGE_KEY_VIDEOS = 'VIDEOS';

const getStorageVideos = ({ key = LOCALSTORAGE_KEY_VIDEOS, filter = 'all' }) => {
  const videos = JSON.parse(window.localStorage.getItem(key)) || { stored: {}, watched: {} };
  return filter === 'all' ? videos : videos[filter];
};

const setStorageVideos = ({ key = LOCALSTORAGE_KEY_VIDEOS, value }) => {
  window.localStorage.setItem(key, JSON.stringify(value));
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

const checkVideoStorageFull = () => {
  const storageVideos = getStorageVideos({});
  const videos = Object.values(storageVideos)
    .reduce((storedAmount, video) => storedAmount + Object.values(video).length, 0);

  if (videos >= RULES.MAX_STORED_VIDEO_AMOUNT) {
    throw new Error(ERROR_MESSAGE.FULL_STORAGE);
  }
};

export {
  checkVideoStorageFull,
  getStorageVideos,
  setStorageVideos,
  removeStorageVideo
};
