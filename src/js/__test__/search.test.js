import { isEmptyKeyword, isNoneSearchResult } from '../utils/validation';
import YOUTUBE_SEARCH_DATA from './youtubeSearchResultData.json';
import YOUTUBE_SEARCH_NONE_DATA from './youtubeSearchResultNoneData.json';

describe('검색어 길이 테스트', () => {
  test('올바른 검색 키워드를 입력하면 false를 반환해야 한다.', () => {
    const searchKeyword = 'test';

    expect(isEmptyKeyword(searchKeyword)).toBeFalsy();
  });

  test('검색 키워드가 빈 문자열이면 true를 반환해야 한다.', () => {
    const searchKeyword = '';

    expect(isEmptyKeyword(searchKeyword)).toBeTruthy();
  });

  test('검색 키워드가 공백으로만 이루어져 있으면 true를 반환해야 한다.', () => {
    const searchKeyword = '     ';

    expect(isEmptyKeyword(searchKeyword)).toBeTruthy();
  });
});

describe('검색 결과 테스트', () => {
  test('유튜브 검색 결과가 없을 경우 true를 반환해야 한다.', () => {
    expect(isNoneSearchResult(YOUTUBE_SEARCH_NONE_DATA)).toBeTruthy();
  });

  test('유튜브 검색 결과가 있을 경우 false를 반환해야 한다.', () => {
    expect(isNoneSearchResult(YOUTUBE_SEARCH_DATA)).toBeFalsy();
  });
});
