import StorageEngine from '../domain/storageEngine.js';

import {
  ERROR_MESSAGE,
  MAX_SAVED_VIDEOS_COUNT,
  STORAGE_KEY_SAVED_VIDEOS,
} from '../util/constants.js';

const generateMaxSavedVideos = () => {
  const sample = { videoId: 'eMf0jojpdJQ' };

  return Array.from({ length: MAX_SAVED_VIDEOS_COUNT }, () => sample);
};

describe('저장 기능 테스트', () => {
  const storageEngine = new StorageEngine();

  beforeEach(() => {
    storageEngine.init();
  });

  test('유튜브 검색 결과를 webstorage에 저장할 수 있다', () => {
    const videoId = 'newVideoId';
    let specificVideo = null;

    specificVideo = storageEngine.getSpecificVideo(videoId);
    expect(specificVideo).toBeUndefined();

    storageEngine.saveVideo(videoId);
    specificVideo = storageEngine.getSpecificVideo(videoId);
    expect(specificVideo.videoId).toEqual(videoId);
  });

  test('유튜브 검색 결과를 webstorage에 100개까지 저장할 수 있다.', () => {
    const mockVideos = generateMaxSavedVideos();

    localStorage.setItem(STORAGE_KEY_SAVED_VIDEOS, JSON.stringify(mockVideos));
    expect(storageEngine.getSavedVideos()).toHaveLength(MAX_SAVED_VIDEOS_COUNT);

    const videoId = 'newVideoId';
    expect(() => storageEngine.saveVideo(videoId)).toThrowError(
      new Error(ERROR_MESSAGE.NO_MORE_VIDEO_SAVABLE)
    );

    expect(storageEngine.getSpecificVideo(videoId)).toBeUndefined();
  });

  test('유튜브 검색 결과를 webstorage에서 삭제할 수 있다', () => {
    const newVideoId = 'newVideoId';
    expect(() => storageEngine.removeVideo(newVideoId)).toThrowError(
      new Error(ERROR_MESSAGE.NO_REMOVABLE_VIDEO_EXIST)
    );

    storageEngine.saveVideo(newVideoId);
    const specificVideo = storageEngine.getSpecificVideo(newVideoId);
    expect(specificVideo.videoId).toEqual(newVideoId);

    storageEngine.removeVideo(newVideoId);
    expect(storageEngine.getSpecificVideo(newVideoId)).toBeUndefined();
  });
});
