import { ERROR } from '../constants';

const STORAGE_KEY = {
  VIDEO_IDS: 'VIDEO_IDS',
  WATCHED_VIDEO_LIST: 'WATCHED_VIDEO_LIST',
};

const getStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  } catch (error) {
    alert(ERROR.FAILED_TO_PARSE);
  }
};

const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { getStorage, setStorage, STORAGE_KEY };
