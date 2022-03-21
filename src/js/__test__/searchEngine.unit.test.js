import SearchEngine from '../domain/searchEngine.js';

test('유튜브 검색 기능 정상 작동', () => {
  const searchEngine = new SearchEngine();
  const keyword = '지피티';

  searchEngine.searchKeyword(keyword).then((response) => {
    expect(response).not.toBe(null);
  });
});
