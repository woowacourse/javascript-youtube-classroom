import SearchVideoStore from '../stores/SearchVideoStore';
import MyVideoStore from '../stores/MyVideoStore';

import { VIDEO } from '../constants';
import dummy from '../../dummy';

describe('영상을 검색할 수 있다.', () => {
  test('영상 검색 결과를 확인할 수 있다.', () => {
    const videos = dummy;

    SearchVideoStore.instance.dispatch(
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

    expect(SearchVideoStore.instance.getVideos()).toHaveLength(videos.items.length);
  });
});

describe('영상을 저장할 수 있다.', () => {
  const videos = [
    {
      details: {
        id: 'video-1',
        thumbnail: 'https://i.ytimg.com/vi/video-1/default.jpg',
        title:
          '%EB%B8%8C%EB%A1%A4%EC%97%90%EC%84%9C%20%EC%9E%84%ED%8F%AC%EC%8A%A4%ED%84%B0%EB%A5%BC%20%ED%95%98%EA%B2%8C%20%EB%90%A0%20%EC%A4%84%EC%9D%B4%EC%95%BC...%20%5B%EB%B8%8C%EB%A1%A4%EC%8A%A4%ED%83%80%EC%A6%88-Brawl%20Stars%5D%20%5BJune%5D',
        channelTitle: 'JUNE',
        publishedAt: '2021-03-07T08:51:56Z',
      },
      isWatched: false,
    },
    {
      details: {
        id: 'video-2',
        thumbnail: 'https://i.ytimg.com/vi/video-2/default.jpg',
        title:
          '%EC%95%88%20%EB%B6%80%EC%88%B4%EC%A7%80%EB%8A%94%20%EB%B2%BD%20%EB%B2%84%EA%B7%B8%EB%A7%B5%EC%9D%B4%20%EC%9A%B0%EC%8A%B9%EB%A7%B5%EC%9D%B4%EB%9D%BC%EA%B3%A0?%20%5B%EB%B8%8C%EB%A1%A4%EC%8A%A4%ED%83%80%EC%A6%88-Brawl%20Stars%5D%20%5BJune%5D',
        channelTitle: 'JUNE',
        publishedAt: '2021-03-06T00:00:43Z',
      },
      isWatched: true,
    },
    {
      details: {
        id: 'video-3',
        thumbnail: 'https://i.ytimg.com/vi/video-3/default.jpg',
        title:
          '%EC%95%88%20%EB%B6%80%EC%88%B4%EC%A7%80%EB%8A%94%20%EB%B2%BD%20%EB%B2%84%EA%B7%B8%EB%A7%B5%EC%9D%B4%20%EC%9A%B0%EC%8A%B9%EB%A7%B5%EC%9D%B4%EB%9D%BC%EA%B3%A0?%20%5B%EB%B8%8C%EB%A1%A4%EC%8A%A4%ED%83%80%EC%A6%88-Brawl%20Stars%5D%20%5BJune%5D',
        channelTitle: 'JUNE',
        publishedAt: '2021-03-05T00:00:43Z',
      },
      isWatched: false,
    },
  ];
  const findVideo = (videoId) =>
    JSON.parse(localStorage.getItem('videos')).find((video) => video.details.id === videoId);

  beforeEach(() => {
    localStorage.clear();
    MyVideoStore._instance = null;
  });

  test('영상을 저장하면 영상의 id를 로컬 스토리지에 저장할 수 있다.', () => {
    const video = {
      details: {
        id: 'movie X tiger',
        thumbnail: 'https://i.ytimg.com/vi/slJclWck7lk/default.jpg',
        title:
          '%EB%B8%8C%EB%A1%A4%EC%97%90%EC%84%9C%20%EC%9E%84%ED%8F%AC%EC%8A%A4%ED%84%B0%EB%A5%BC%20%ED%95%98%EA%B2%8C%20%EB%90%A0%20%EC%A4%84%EC%9D%B4%EC%95%BC...%20%5B%EB%B8%8C%EB%A1%A4%EC%8A%A4%ED%83%80%EC%A6%88-Brawl%20Stars%5D%20%5BJune%5D',
        channelTitle: 'JUNE',
        publishedAt: '2021-03-07T08:51:56Z',
      },
      isWatched: false,
    };

    MyVideoStore.instance.dispatch([video]);

    expect(findVideo(video.details.id).details.id).toBe(video.details.id);
  });

  test('최대 영상 저장 개수를 초과한 경우, 영상 저장이 불가능하다.', () => {
    const videos = Array.from({ length: VIDEO.MAX_SAVABLE_COUNT });

    MyVideoStore.instance.dispatch(videos);

    expect(MyVideoStore.instance.canSaveVideo()).toBe(false);
  });

  test('영상의 시청 여부를 변경할 수 있다.', () => {
    // 영상을 본 영상으로 변경할 수 있다.

    videos.forEach((video) => {
      if (video.details.id === 'video-1') {
        video.isWatched = !video.isWatched;
      }
    });

    MyVideoStore.instance.dispatch(videos);

    expect(findVideo('video-1').isWatched).toBe(true);

    // 영상을 볼 영상으로 변경할 수 있다.

    videos.forEach((video) => {
      if (video.details.id === 'video-1') {
        video.isWatched = !video.isWatched;
      }
    });

    MyVideoStore.instance.dispatch(videos);

    expect(findVideo('video-1').isWatched).toBe(false);
  });

  test('영상을 삭제할 수 있다.', () => {
    const newVideos = videos.filter((video) => 'video-2' !== video.details.id);

    MyVideoStore.instance.dispatch(newVideos);

    expect(findVideo('video-2')).toBeUndefined();
  });

  test('볼 영상 목록을 가져올 수 있다.', () => {
    MyVideoStore.instance.dispatch(videos);

    expect(MyVideoStore.instance.getPlaylistVideos()).toHaveLength(2);
  });

  test('본 영상 목록을 가져올 수 있다.', () => {
    MyVideoStore.instance.dispatch(videos);

    expect(MyVideoStore.instance.getWatchedVideos()).toHaveLength(1);
  });
});
