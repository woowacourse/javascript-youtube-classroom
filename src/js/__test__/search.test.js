import search from '../domain/search';
import LocalStorageMock from './LocalStorageMock';
import fetch from './fetchMock';

global.localStorage = new LocalStorageMock();
global.fetch = fetch;

describe('검색어 검색 테스트', () => {
  const properFormDataTest = (data) => {
    ['videoId', 'thumbnail', 'title', 'channelTitle', 'publishedAt', 'isSaved'].forEach((key) => {
      expect(data[key]).not.toEqual(undefined);
    });
  };

  test('검색 요청했을 때 올바른 형태로 데이터를 반환할 수 있다.', async () => {
    const searchResultArray = await search.getSearchResultArray('dummy-keyword');

    searchResultArray.forEach((searchResult) => {
      properFormDataTest(searchResult);
    });
  });

  test('추가 데이터를 올바른 형태로 반환할 수 있다.', async () => {
    search.keyword = 'dummy-keyword';

    const searchResultArray = await search.getLoadMoreResultArray();

    searchResultArray.forEach((searchResult) => {
      properFormDataTest(searchResult);
    });
  });
});
