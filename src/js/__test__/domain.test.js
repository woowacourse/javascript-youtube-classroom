import SearchEngine from '../domain/searchEngine.js';
import StorageEngine from '../domain/storageEngine.js';

import { MAX_SAVED_VIDEOS_LENGTH } from '../util/constants.js';

const generate100Videos = () => {
  const sample = { videoId: 'eMf0jojpdJQ' };

  return Array.from({ length: 100 }, () => sample);
};

test('유튜브 검색 기능 정상 작동', () => {
  const searchEngine = new SearchEngine();
  const keyword = '지피티';

  searchEngine.searchKeyword(keyword).then((response) => {
    expect(response).not.toBe(null);
  });
});

test('유튜브 검색 결과를 webstorage에 저장할 수 있다', () => {
  const storageEngine = new StorageEngine();
  const videoId = 'eMf0jojpdJQ';

  storageEngine.saveVideo(videoId);

  expect(storageEngine.getSavedVideos()).not.toBe(null);
});

test('유튜브 검색 결과를 webstorage에 100개까지 저장할 수 있다.', () => {
  const storageEngine = new StorageEngine();
  const mockVideos = generate100Videos();

  localStorage.setItem('savedVideos', JSON.stringify(mockVideos));
  expect(storageEngine.getSavedVideos()).toHaveLength(MAX_SAVED_VIDEOS_LENGTH);

  const videoId = 'eMf0jojpdJQ';
  storageEngine.saveVideo(videoId);
  expect(storageEngine.getSavedVideos()).toHaveLength(MAX_SAVED_VIDEOS_LENGTH);
});
