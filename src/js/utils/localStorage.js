import { ERROR_MESSAGE, RULES } from '../constants';

const LOCALSTORAGE_KEY = 'VIDEO_IDS';

const getStorageVideoIDs = (key) =>
  JSON.parse(window.localStorage.getItem(key)) || [];

const setStorageVideoIDs = ({ key, value }) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const checkVideoStorageFull = (key) => {
  if (getStorageVideoIDs(key).length >= RULES.MAX_STORED_IDS_AMOUNT) {
    throw new Error(ERROR_MESSAGE.FULL_STORAGE);
  }
};

export { getStorageVideoIDs, setStorageVideoIDs, LOCALSTORAGE_KEY, checkVideoStorageFull };
