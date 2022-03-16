import { MAX_SAVE_COUNT, MESSAGE } from '../constants';

export const store = {
  setLocalStorage(key, value) {
    const saveDatas = store.getLocalStorage(key) ?? [];

    if (saveDatas.length >= MAX_SAVE_COUNT) {
      throw Error(MESSAGE.ERROR_EXCESS_SAVE_COUNT);
    }

    saveDatas.push(value);
    localStorage.setItem(key, JSON.stringify(saveDatas));
  },
  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  removeLocalStorage(key) {
    localStorage.removeItem(key);
  },
};
