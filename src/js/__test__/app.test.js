import SearchEngine from '../searchEngine.js';
import StorageEngine from '../storageEngine.js';

import { isNull } from '../util/common.js';
import { generate100Data } from './mockData.js';

test('유튜브 검색 기능 정상 작동', async () => {
  const searchEngine = new SearchEngine();
  const keyword = '지피티';

  const response = await searchEngine.searchKeyword(keyword);
  // TODO : isNull을 toBe(null)로 대체가능하면 하기
  expect(isNull(response)).toBe(false);
});

test('유튜브 검색 결과를 webstorage에 저장할 수 있다', () => {
  const storageEngine = new StorageEngine();
  const videoId = 'eMf0jojpdJQ';

  storageEngine.saveData(videoId);
  console.log(storageEngine.getData());

  expect(storageEngine.getData()).not.toBe(null);
});

test('유튜브 검색 결과를 webstorage에 100개까지 저장할 수 있다.', () => {
  const storageEngine = new StorageEngine();
  const mockData = generate100Data();

  localStorage.setItem('myVideos', JSON.stringify(mockData));
  expect(storageEngine.getData()).toHaveLength(100);

  const videoId = 'eMf0jojpdJQ';
  storageEngine.saveData(videoId);
  expect(storageEngine.getData()).toHaveLength(100);
});
