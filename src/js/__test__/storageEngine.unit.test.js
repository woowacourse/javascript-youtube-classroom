import StorageEngine from '../domain/storageEngine.js';

import {
  ERROR_MESSAGE,
  MAX_SAVED_VIDEOS_COUNT,
  STORAGE_KEY_SAVED_VIDEOS,
} from '../util/constants.js';

const generateMaxSavedVideos = () => {
  const sample = {
    videoId: 'eMf0jojpdJQ',
    thumbnail: 'https://img22.co.kr',
    title: 'oldVideoTitle',
    channelTitle: 'oldVideoChannelTitle',
    publishTime: '1900년 05월 21일',
    isViewed: false,
  };

  return Array.from({ length: MAX_SAVED_VIDEOS_COUNT }, () => sample);
};

const mockVideo = {
  videoId: 'newVideoId',
  thumbnail: 'https://img.co.kr',
  title: 'newVideoTitle',
  channelTitle: 'newVideoChannelTitle',
  publishTime: '2020년 05월 21일',
};

describe('저장 기능 테스트', () => {
  const storageEngine = new StorageEngine();

  beforeEach(() => {
    storageEngine.init();
  });

  test('유튜브 검색 결과중 특정 비디오를 webstorage에 저장할 수 있다', () => {
    const newVideo = { ...mockVideo };
    let specificVideo = null;

    specificVideo = storageEngine.getSpecificVideo(newVideo.videoId);
    expect(specificVideo).toBeUndefined();

    storageEngine.saveVideo(newVideo);
    specificVideo = storageEngine.getSpecificVideo(newVideo.videoId);
    expect(specificVideo.videoId).toEqual(newVideo.videoId);
  });

  test('webstorage에 비디오들을 100개까지만 저장할 수 있다.', () => {
    const mockVideos = generateMaxSavedVideos();

    localStorage.setItem(STORAGE_KEY_SAVED_VIDEOS, JSON.stringify(mockVideos));
    expect(storageEngine.getSavedVideos()).toHaveLength(MAX_SAVED_VIDEOS_COUNT);

    const newVideo = { ...mockVideo };

    expect(() => storageEngine.saveVideo(newVideo)).toThrowError(
      new Error(ERROR_MESSAGE.NO_MORE_VIDEO_SAVABLE)
    );

    expect(storageEngine.getSpecificVideo(newVideo.videoId)).toBeUndefined();
  });

  test('webstorage에 저장되어 있는 특정 비디오를 삭제할 수 있다', () => {
    const newVideo = { ...mockVideo };

    storageEngine.saveVideo(newVideo);
    const specificVideo = storageEngine.getSpecificVideo(newVideo.videoId);
    expect(specificVideo.videoId).toEqual(newVideo.videoId);

    storageEngine.removeVideo(newVideo.videoId);
    expect(storageEngine.getSpecificVideo(newVideo.videoId)).toBeUndefined();
  });

  test('저장되어 있는 특정 비디오중 본 비디오를 체크할 수 있다', () => {
    const newVideo = { ...mockVideo };
    storageEngine.saveVideo(newVideo);
    expect(storageEngine.getSpecificVideo(newVideo.videoId)).toMatchObject({
      videoId: 'newVideoId',
      thumbnail: 'https://img.co.kr',
      title: 'newVideoTitle',
      channelTitle: 'newVideoChannelTitle',
      publishTime: '2020년 05월 21일',
      isViewed: false,
    });

    storageEngine.checkVideoViewed(newVideo.videoId);
    expect(storageEngine.getSpecificVideo(newVideo.videoId)).toMatchObject({
      videoId: 'newVideoId',
      thumbnail: 'https://img.co.kr',
      title: 'newVideoTitle',
      channelTitle: 'newVideoChannelTitle',
      publishTime: '2020년 05월 21일',
      isViewed: true,
    });
  });
});
