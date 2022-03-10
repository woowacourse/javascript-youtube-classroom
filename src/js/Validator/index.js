import ValidationError from '../ValidationError/index.js';
import { isEmpty } from '../utils/index.js';

export const checkKeyword = (keyword) => {
  if (isEmpty(keyword)) throw new ValidationError('검색어를 입력해주세요!');
};
