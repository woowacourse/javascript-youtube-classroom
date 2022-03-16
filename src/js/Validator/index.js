import ValidationError from '../ValidationError/index.js';
import { isEmpty } from '../utils/index.js';
import { ERROR_MESSAGE } from '../constants/index.js';

export const checkKeyword = (keyword) => {
  if (isEmpty(keyword)) throw new ValidationError(ERROR_MESSAGE.EMPTY_KEYWORD);
};
