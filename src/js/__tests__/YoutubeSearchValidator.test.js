import { isEmptyString, isSameKeyword } from '../utils/Validator';

describe('유튜브 검색어 validation 테스트', () => {
  test('검색어는 빈 칸일 수 없다.', () => {
    const searchKeyword = '';
    expect(isEmptyString(searchKeyword)).toBe(true);
  });

  test('현재 검색어와 중복된 검색어를 시도할 시 검색을 하지 않는다.', () => {
    const beforeKeyword = '우테코';
    const newKeyword = '우테코';

    expect(isSameKeyword(beforeKeyword, newKeyword)).toBe(true);
  });
});
