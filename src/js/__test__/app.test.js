import SearchEngine from '../searchEngine.js';

import { isNull } from '../util/common.js';

test('유튜브 검색 기능 정상 작동', async () => {
  const searchEngine = new SearchEngine();
  const keyword = '지피티';

  const response = await searchEngine.searchKeyword(keyword);
  // TODO : isNull을 toBe(null)로 대체가능하면 하기
  expect(isNull(response)).toBe(false);
});

test('유튜브 검색 결과를 webstorage에 저장할 수 있다', () => {
  const storeEngine = new StoreEngine();

  storeEngine.saveData();

  expect(storeEngine.getData()).not.toBe(null);
});
