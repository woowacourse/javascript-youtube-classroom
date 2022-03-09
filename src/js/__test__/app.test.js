import SearchEngine from '../searchEngine.js';
import StorageEngine from '../storageEngine.js';

import { isNull } from '../util/common.js';

test('유튜브 검색 기능 정상 작동', async () => {
  const searchEngine = new SearchEngine();
  const keyword = '지피티';

  const response = await searchEngine.searchKeyword(keyword);
  // TODO : isNull을 toBe(null)로 대체가능하면 하기
  expect(isNull(response)).toBe(false);
});

test('유튜브 검색 결과를 webstorage에 저장할 수 있다', async () => {
  const searchEngine = new SearchEngine();
  const storageEngine = new StorageEngine();
  storageEngine.clearData();

  const keyword = '지피티 구독자 일반인';
  const data = await searchEngine.searchKeyword(keyword);

  storageEngine.saveData(data);

  expect(storageEngine.getData()).not.toBe(null);
});

test('유튜브 검색 결과를 webstorage에 100개까지 저장할 수 있다.', () => {
  const storageEngine = new StorageEngine();

  expect(storageEngine.getData()).toHaveLength(100);
});
