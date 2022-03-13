import { ERROR_MESSAGE } from '../constants';

const isEmptyKeyword = (keyword) => keyword.trim().length === 0;

const validateKeyword = (keyword) => {
  if (isEmptyKeyword(keyword)) {
    throw new Error(ERROR_MESSAGE.EMPTY_KEYWORD);
  }
};

export { validateKeyword };
