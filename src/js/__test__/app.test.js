import SearchEngine from '../searchEngine.js';

import { isNull } from '../util/common.js';

test('유튜브 검색 기능 정상 작동', async () => {
  const searchEngine = new SearchEngine();
  const keyword = '지피티';

  const response = await searchEngine.searchKeyword(keyword);

  expect(isNull(response)).toBe(false);
});
