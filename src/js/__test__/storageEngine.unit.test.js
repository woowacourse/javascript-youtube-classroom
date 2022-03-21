import StorageEngine from '../domain/storageEngine.js';

import { ERROR_MESSAGE, MAX_SAVED_VIDEOS_COUNT, VIDEOS_TYPE } from '../util/constants.js';

const generateMaxSavedVideos = () => {
  const sample = (index) => {
    return {
      videoId: `eMf0jojpdJQ-${index}`,
      thumbnail: 'https://img22.co.kr',
      title: 'oldVideoTitle',
      channelTitle: 'oldVideoChannelTitle',
      publishTime: '1900년 05월 21일',
    };
  };

  return Array.from({ length: MAX_SAVED_VIDEOS_COUNT }, (_, index) => sample(index));
};

const mockVideo = {
  videoId: 'newVideoId',
  thumbnail: 'https://img.co.kr',
  title: 'newVideoTitle',
  channelTitle: 'newVideoChannelTitle',
  publishTime: '2020년 05월 21일',
};

describe('저장 기능 테스트', () => {
  const storageEngine = StorageEngine.instance;

  beforeEach(() => {
    storageEngine.init();
  });

  test('유튜브 검색 결과중 특정 비디오를 webstorage에 저장할 수 있다', () => {
    const newVideo = { ...mockVideo };
    let videoToView = null;
    let viewedVideo = null;

    // 볼 영상 storage
    videoToView = storageEngine.getSpecificVideo(newVideo.videoId, VIDEOS_TYPE.VIDEOS_TO_VIEW);
    expect(videoToView).toBeUndefined();

    storageEngine.saveVideo(newVideo, VIDEOS_TYPE.VIDEOS_TO_VIEW);
    videoToView = storageEngine.getSpecificVideo(newVideo.videoId, VIDEOS_TYPE.VIDEOS_TO_VIEW);
    expect(videoToView.videoId).toEqual(newVideo.videoId);

    // 본 영상 storage
    viewedVideo = storageEngine.getSpecificVideo(newVideo.videoId, VIDEOS_TYPE.VIEWED_VIDEOS);
    expect(viewedVideo).toBeUndefined();

    storageEngine.saveVideo(newVideo, VIDEOS_TYPE.VIEWED_VIDEOS);
    viewedVideo = storageEngine.getSpecificVideo(newVideo.videoId, VIDEOS_TYPE.VIEWED_VIDEOS);
    expect(viewedVideo.videoId).toEqual(newVideo.videoId);
  });

  test('webstorage에 비디오들을 100개까지만 저장할 수 있다.', () => {
    const mockVideos = generateMaxSavedVideos();
    const newVideo = { ...mockVideo };

    // 볼 영상 storage
    mockVideos.forEach((video) => storageEngine.saveVideo(video, VIDEOS_TYPE.VIDEOS_TO_VIEW));

    expect(storageEngine.getVideosToView()).toHaveLength(MAX_SAVED_VIDEOS_COUNT);

    expect(() => storageEngine.saveVideo(newVideo, VIDEOS_TYPE.VIDEOS_TO_VIEW)).toThrowError(
      new Error(ERROR_MESSAGE.NO_MORE_VIDEO_SAVABLE)
    );

    // 본 영상 storage
    mockVideos.forEach((video) => storageEngine.saveVideo(video, VIDEOS_TYPE.VIEWED_VIDEOS));

    expect(storageEngine.getViewedVideos()).toHaveLength(MAX_SAVED_VIDEOS_COUNT);

    expect(() => storageEngine.saveVideo(newVideo, VIDEOS_TYPE.VIEWED_VIDEOS)).toThrowError(
      new Error(ERROR_MESSAGE.NO_MORE_VIDEO_SAVABLE)
    );

    expect(
      storageEngine.getSpecificVideo(newVideo.videoId, VIDEOS_TYPE.VIEWED_VIDEOS)
    ).toBeUndefined();
  });

  test('webstorage에 저장되어 있는 특정 비디오를 삭제할 수 있다', () => {
    // 볼 영상 storage
    const newVideo = { ...mockVideo };

    storageEngine.saveVideo(newVideo, VIDEOS_TYPE.VIDEOS_TO_VIEW);
    const videoToView = storageEngine.getSpecificVideo(
      newVideo.videoId,
      VIDEOS_TYPE.VIDEOS_TO_VIEW
    );
    expect(videoToView.videoId).toEqual(newVideo.videoId);

    storageEngine.removeVideo(newVideo.videoId, VIDEOS_TYPE.VIDEOS_TO_VIEW);
    expect(
      storageEngine.getSpecificVideo(newVideo.videoId, VIDEOS_TYPE.VIDEOS_TO_VIEW)
    ).toBeUndefined();

    //본 영상
    storageEngine.saveVideo(newVideo, VIDEOS_TYPE.VIEWED_VIDEOS);
    const viewedVideo = storageEngine.getSpecificVideo(newVideo.videoId, VIDEOS_TYPE.VIEWED_VIDEOS);
    expect(viewedVideo.videoId).toEqual(newVideo.videoId);

    storageEngine.removeVideo(newVideo.videoId, VIDEOS_TYPE.VIEWED_VIDEOS);
    expect(
      storageEngine.getSpecificVideo(newVideo.videoId, VIDEOS_TYPE.VIEWED_VIDEOS)
    ).toBeUndefined();
  });

  test('저장되어 있는 특정 비디오중 본 비디오를 체크할 수 있다', () => {
    const newVideo = { ...mockVideo };

    // 볼 영상  -> 본 영상
    storageEngine.saveVideo(newVideo, VIDEOS_TYPE.VIDEOS_TO_VIEW);
    expect(
      storageEngine.getSpecificVideo(newVideo.videoId, VIDEOS_TYPE.VIDEOS_TO_VIEW)
    ).toMatchObject({
      videoId: 'newVideoId',
      thumbnail: 'https://img.co.kr',
      title: 'newVideoTitle',
      channelTitle: 'newVideoChannelTitle',
      publishTime: '2020년 05월 21일',
    });

    storageEngine.changeVideoViewed(newVideo.videoId, VIDEOS_TYPE.VIDEOS_TO_VIEW);
    expect(
      storageEngine.getSpecificVideo(newVideo.videoId, VIDEOS_TYPE.VIEWED_VIDEOS)
    ).toMatchObject({
      videoId: 'newVideoId',
      thumbnail: 'https://img.co.kr',
      title: 'newVideoTitle',
      channelTitle: 'newVideoChannelTitle',
      publishTime: '2020년 05월 21일',
    });

    // 본 영상 -> 볼 영상
    storageEngine.saveVideo(newVideo, VIDEOS_TYPE.VIEWED_VIDEOS);
    expect(
      storageEngine.getSpecificVideo(newVideo.videoId, VIDEOS_TYPE.VIEWED_VIDEOS)
    ).toMatchObject({
      videoId: 'newVideoId',
      thumbnail: 'https://img.co.kr',
      title: 'newVideoTitle',
      channelTitle: 'newVideoChannelTitle',
      publishTime: '2020년 05월 21일',
    });

    storageEngine.changeVideoViewed(newVideo.videoId, VIDEOS_TYPE.VIEWED_VIDEOS);
    expect(
      storageEngine.getSpecificVideo(newVideo.videoId, VIDEOS_TYPE.VIDEOS_TO_VIEW)
    ).toMatchObject({
      videoId: 'newVideoId',
      thumbnail: 'https://img.co.kr',
      title: 'newVideoTitle',
      channelTitle: 'newVideoChannelTitle',
      publishTime: '2020년 05월 21일',
    });
  });
});
