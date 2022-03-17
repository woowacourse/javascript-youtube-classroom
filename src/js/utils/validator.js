import { ERROR_MESSAGE, STORE } from './constants.js';

const validator = {
  checkSearchInput: searchInput => {
    if (isEmptyInput(searchInput)) {
      throw new Error(ERROR_MESSAGE.EMPTY_INPUT);
    }
  },
  checkStoredVideoListOverMaxLength: videoList => {
    if (isOverVideoListMaxLength(videoList)) {
      throw new Error(ERROR_MESSAGE.OVER_MAX_STORE_LENGTH);
    }
  },
};

function isEmptyInput(searchInput) {
  return searchInput.trim() === '';
}

function isOverVideoListMaxLength(videoList) {
  return videoList.length >= STORE.VIDEO_LIST_MAX_LENGTH;
}

export default validator;
