import { ERROR } from '../constants';

const LOCALSTORAGE_KEY = {
  VIDEO_IDS: 'VIDEO_IDS',
  VIDEO_INFO_LIST: 'VIDEO_INFO_LIST',
};

const getStorageVideoIDs = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  } catch (error) {
    alert(ERROR.FAILED_TO_PARSE);
  }
};

const setStorageVideoIDs = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { getStorageVideoIDs, setStorageVideoIDs, LOCALSTORAGE_KEY };
