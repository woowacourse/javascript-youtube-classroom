import { ERROR } from '../constants';

const STORAGE_KEY = {
  WATCH_LATER_VIDEOS: 'WATCH_LATER_VIDEOS',
  WATCHED_VIDEOS: 'WATCHED_VIDEOS',
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
