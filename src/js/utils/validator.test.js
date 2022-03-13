import { isEmptyString, isSameKeyword } from './Validator';

describe('유튜브 검색어 validation 테스트', () => {
  test('빈칸일 경우 true를 반환한다.', () => {
    const searchKeyword = '';
    expect(isEmptyString(searchKeyword)).toBe(true);
  });

  test('두 개의 문자열이 같은지 판별한다.', () => {
    const beforeKeyword = '우테코';
    const newKeyword = '우테코';

    expect(isSameKeyword(beforeKeyword, newKeyword)).toBe(true);
  });
});
