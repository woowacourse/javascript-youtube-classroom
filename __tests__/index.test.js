import { validateSearchKeyword } from '../src/js/validation';
import { ERROR_MESSAGE } from '../src/js/constants';

it('검색 키워드는 2자 이상이어야 한다', () => {
  const wrongCaseInput = 'a';
  expect(() => validateSearchKeyword(wrongCaseInput)).toThrow(ERROR_MESSAGE.SEARCH_KEYWORD_MIN_LENGTH);
});
