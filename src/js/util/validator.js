import { getLocalStorage } from '../store/localStorage';
import { ERROR_MESSAGE, LOCALSTORAGE_KEY_SAVE, MAX_STOARGE_CAPACITY } from '../constant';

const validator = {
  isEmptyInput: (value) => value === '',
};

export const checkValidSearchInput = (value) => {
  if (validator.isEmptyInput(value)) {
    throw new Error(ERROR_MESSAGE.NO_INPUT);
  }
};

export const checkMaxStorageVolume = () => {
  if (getLocalStorage(LOCALSTORAGE_KEY_SAVE).length >= MAX_STOARGE_CAPACITY) {
    throw new Error(ERROR_MESSAGE.EXCEED_STORAGE_CAPACITY_ERROR);
  }
};

export const checkSavedVideo = (id) =>
  getLocalStorage(LOCALSTORAGE_KEY_SAVE).some((item) => item.videoId === id);
