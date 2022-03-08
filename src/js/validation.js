import { SEARCH_KEYWORD_MIN_LENGTH, ERROR_MESSAGE } from './constants';

export const validateSearchKeyword = (searchKeyword) => {
  if (searchKeyword.length <= SEARCH_KEYWORD_MIN_LENGTH) throw new Error(ERROR_MESSAGE.SEARCH_KEYWORD_MIN_LENGTH);
};
