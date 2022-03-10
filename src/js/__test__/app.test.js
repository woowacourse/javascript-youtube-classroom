import SearchEngine from '../domain/searchEngine.js';
import StorageEngine from '../domain/storageEngine.js';

const generate100Data = () => {
  const sample = { videoId: 'eMf0jojpdJQ' };

  return Array.from({ length: 100 }, () => sample);
};

test('유튜브 검색 기능 정상 작동', async () => {
  const searchEngine = new SearchEngine();
  const keyword = '지피티';

  const response = await searchEngine.searchKeyword(keyword);
  expect(response).not.toBe(null);
});

test('유튜브 검색 결과를 webstorage에 저장할 수 있다', () => {
  const storageEngine = new StorageEngine();
  const videoId = 'eMf0jojpdJQ';

  storageEngine.saveVideo(videoId);

  expect(storageEngine.getSavedVideos()).not.toBe(null);
});

test('유튜브 검색 결과를 webstorage에 100개까지 저장할 수 있다.', () => {
  const storageEngine = new StorageEngine();
  const mockData = generate100Data();

  localStorage.setItem('savedVideos', JSON.stringify(mockData));
  expect(storageEngine.getSavedVideos()).toHaveLength(100);

  const videoId = 'eMf0jojpdJQ';
  storageEngine.saveVideo(videoId);
  expect(storageEngine.getSavedVideos()).toHaveLength(100);
});
