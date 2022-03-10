import VideoStore from '../VideoStore';
import { saveVideo } from '../domains/Save';

import { ERROR_MESSAGE, VIDEO } from '../constants';
import dummy from '../../dummy';

describe('영상을 검색할 수 있다.', () => {
  test('영상 검색 결과를 확인할 수 있다.', () => {
    const videos = dummy;

    VideoStore.instance.dispatch(
      'search',
      videos.items.map((item) => {
        return {
          id: item.id.videoId,
          thumbnail: encodeURI(item.snippet.thumbnails.default.url),
          title: encodeURI(item.snippet.title),
          channelTitle: encodeURI(item.snippet.channelTitle),
          publishedAt: item.snippet.publishedAt,
        };
      })
    );

    expect(VideoStore.instance.getVideos()).toHaveLength(videos.items.length);
  });
});

describe('영상을 저장할 수 있다.', () => {
  const findVideo = (videoId) =>
    JSON.parse(localStorage.getItem('videos')).find((video) => video.videoId === videoId);

  beforeEach(() => {
    localStorage.clear();
  });

  test('영상을 저장하면 영상의 id를 로컬 스토리지에 저장할 수 있다.', () => {
    const videoId = 'movie X tiger';

    saveVideo(videoId);

    expect(findVideo(videoId).videoId).toBe(videoId);
  });

  test('최대 영상 저장 개수를 초과한 경우, 영상 저장이 불가능하다.', () => {
    const videoId = 'movie X tiger';

    // when
    for (let index = 0; index < VIDEO.MAX_SAVABLE_COUNT; index += 1) {
      saveVideo(`${videoId}${index}`);
    }

    window.alert = jest.fn().mockReturnValue(ERROR_MESSAGE.EXCEED_MAX_SAVABLE_COUNT);
    const spyFn = jest.spyOn(window, 'alert');

    saveVideo(videoId);

    // then
    expect(spyFn).toBeCalledTimes(1);
    expect(spyFn).toBeCalledWith(ERROR_MESSAGE.EXCEED_MAX_SAVABLE_COUNT);
    expect(findVideo(videoId)).toBe(undefined);
  });
});
