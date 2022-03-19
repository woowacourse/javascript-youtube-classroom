import { ERROR } from '../constants';

const STORAGE_KEY = {
  VIDEO_IDS: 'VIDEO_IDS',
  VIDEO_INFO_LIST: 'VIDEO_INFO_LIST',
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
