import SearchEngine from '../domain/searchEngine.js';
import StorageEngine from '../domain/storageEngine.js';

import { ERROR_MESSAGE, MAX_SAVED_VIDEOS_COUNT } from '../util/constants.js';

const generateMaxSavedVideos = () => {
  const sample = { videoId: 'eMf0jojpdJQ' };

  return Array.from({ length: MAX_SAVED_VIDEOS_COUNT }, () => sample);
};

// test('유튜브 검색 기능 정상 작동', () => {
//   const searchEngine = new SearchEngine();
//   const keyword = '지피티';

//   searchEngine.searchKeyword(keyword).then((response) => {
//     expect(response).not.toBe(null);
//   });
// });

describe('저장 기능 테스트', () => {
  const storageEngine = new StorageEngine();

  beforeEach(() => {
    storageEngine.init();
  });

  test('유튜브 검색 결과를 webstorage에 저장할 수 있다', () => {
    const videoId = 'newVideoId';

    storageEngine.saveVideo(videoId);

    const specificVideo = storageEngine.getSpecificVideo(videoId);

    expect(specificVideo.videoId).toEqual(videoId);
  });

  test('유튜브 검색 결과를 webstorage에 100개까지 저장할 수 있다.', () => {
    const mockVideos = generateMaxSavedVideos();

    localStorage.setItem('savedVideos', JSON.stringify(mockVideos));
    expect(storageEngine.getSavedVideos()).toHaveLength(MAX_SAVED_VIDEOS_COUNT);

    const videoId = 'newVideoId';

    expect(() => storageEngine.saveVideo(videoId)).toThrowError(
      new Error(ERROR_MESSAGE.NO_MORE_VIDEO_SAVABLE)
    );

    expect(storageEngine.getSpecificVideo(videoId)).toBeUndefined();
  });
});
