import { ERROR_MESSAGE, STORE } from './constants.js';

const validator = {
  checkSearchInput: searchInput => {
    if (isEmptyInput(searchInput)) {
      throw new Error(ERROR_MESSAGE.EMPTY_INPUT);
    }
  },
  checkOverVideoIdListMaxLength: videoIdList => {
    if (isOverVideoIdListMaxLength(videoIdList)) {
      throw new Error(ERROR_MESSAGE.OVER_MAX_STORE_LENGTH);
    }
  },
};

function isEmptyInput(searchInput) {
  return searchInput.trim() === '';
}

function isOverVideoIdListMaxLength(videoIdList) {
  return videoIdList.length >= STORE.VIDEO_ID_LIST_MAX_LENGTH;
}

export default validator;
