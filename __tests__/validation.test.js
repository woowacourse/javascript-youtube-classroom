import { validateSearchKeyword } from '../src/js/Manager/validation';
import { ERROR_MESSAGE } from '../src/js/Manager/constants';

describe('유효성 검사 테스트', () => {
  it('검색 키워드는 2자 이상이어야 한다', () => {
    const wrongCaseInput = 'a';
    expect(() => validateSearchKeyword(wrongCaseInput)).toThrow(ERROR_MESSAGE.SEARCH_KEYWORD_MIN_LENGTH);
  });
});
