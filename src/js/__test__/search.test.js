import validator from '../utils/validator.js';
import { ERROR_MESSAGE } from '../utils/constants.js';

describe('검색어가 비었을 때 검색을 하면', () => {
  test('검색어가 비어있다는 error가 발생한다.', () => {
    const inputValue = '';
    expect(() => validator.validateSearchInput(inputValue)).toThrowError(ERROR_MESSAGE.EMPTY_INPUT);
  });
});
