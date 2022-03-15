import { SEARCH_KEYWORD_MIN_LENGTH, ERROR_MESSAGE, MAX_VIDEO_SAVE } from './constants';

export const validateSearchKeyword = (searchKeyword) => {
  if (searchKeyword.length < SEARCH_KEYWORD_MIN_LENGTH) throw new Error(ERROR_MESSAGE.SEARCH_KEYWORD_MIN_LENGTH);
};

export const isOverVideoSaveMaxCount = (videoIds) => videoIds.length >= MAX_VIDEO_SAVE;
