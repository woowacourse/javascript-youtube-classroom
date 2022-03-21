import SearchedVideo from '../stores/SearchedVideo';
import SavedVideo from '../stores/SavedVideo';
import State from '../domains/State';

import dummy from '../../dummy';

describe('영상을 검색할 수 있다.', () => {
  test('영상 검색 결과를 확인할 수 있다.', () => {
    const videos = dummy;

    SearchedVideo.instance.dispatch(
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

    expect(SearchedVideo.instance.getVideos()).toHaveLength(videos.items.length);
  });
});

describe('영상을 저장할 수 있다.', () => {
  const findVideo = (videoId) =>
    JSON.parse(localStorage.getItem('videos')).find((video) => video.id === videoId);

  beforeEach(() => {
    localStorage.clear();
    SavedVideo._instance = null;
  });

  test('영상을 로컬 스토리지에 저장할 수 있다.', () => {
    const video = {
      id: 'movie X tiger',
      title: '테스트 코드를 짜보자.',
      thumbnail: '',
      channelTitle: 'movie X tiger',
      publishedAt: '2022-03-18T17:57:25Z',
      isWatched: false,
    };

    SavedVideo.instance.dispatch('save', [video]);

    expect(findVideo(video.id).id).toBe(video.id);
  });

  test('최대 영상 저장 개수를 초과한 경우, 영상 저장이 불가능하다.', () => {
    class Video {
      constructor() {
        this.id = Math.random().toString(36).substring(2, 9);
        this.title = '테스트 코드를 짜보자.';
        this.thumbnail = '';
        this.channelTitle = 'movie X tiger';
        this.publishedAt = '2022-03-18T17:57:25Z';
        this.isWatched = false;
      }
    }

    SavedVideo.instance.dispatch(
      'save',
      Array.from({ length: 100 }).map(() => new Video())
    );

    expect(SavedVideo.instance.isStorable()).toBe(false);
  });
});

describe('영상 상태를 변경할 수 있다.', () => {
  const findVideo = (videoId) =>
    JSON.parse(localStorage.getItem('videos')).find((video) => video.id === videoId);

  const saveVideo = ({ videoId, isWatched }) => {
    const video = {
      id: videoId,
      title: '테스트 코드를 짜보자.',
      thumbnail: '',
      channelTitle: 'movie X tiger',
      publishedAt: '2022-03-18T17:57:25Z',
      isWatched: isWatched,
    };

    SavedVideo.instance.dispatch('save', [video]);
  };

  beforeEach(() => {
    localStorage.clear();
    SavedVideo._instance = null;
    State._instance = null;
  });

  test('특정 영상을 이미 본 영상으로 상태 변경할 수 있다.', () => {
    const videoId = 'movie X tiger';

    saveVideo({ videoId: videoId, isWatched: false });
    State.instance.updateVideoState(videoId);

    expect(findVideo(videoId).isWatched).toBe(true);
  });

  test('이미 본 영상을 아직 보지 않은 영상으로 상태 변경할 수 있다.', () => {
    const videoId = 'movie X tiger';

    saveVideo({ videoId: videoId, isWatched: true });
    State.instance.updateVideoState(videoId);

    expect(findVideo(videoId).isWatched).toBe(false);
  });

  test('저장된 영상을 삭제할 수 있다.', () => {
    const videoId = 'movie X tiger';

    saveVideo({ videoId: videoId, isWatched: false });
    State.instance.removeVideo(videoId);

    expect(findVideo(videoId)).toBe(undefined);
  });
});

describe('영상들을 불러올 수 있다.', () => {
  const videoList = [
    {
      id: 'movie',
      title: '테스트 코드를 짜보자.',
      thumbnail: '',
      channelTitle: 'movie X tiger',
      publishedAt: '2022-03-18T17:57:25Z',
      isWatched: true,
    },
    {
      id: 'tiger',
      title: '테스트 코드를 짜보자.',
      thumbnail: '',
      channelTitle: 'movie X tiger',
      publishedAt: '2022-03-18T17:57:25Z',
      isWatched: false,
    },
  ];

  beforeEach(() => {
    localStorage.clear();
    SavedVideo._instance = null;
    SavedVideo.instance.dispatch('save', videoList);
  });

  test('본 영상들을 불러올 수 있다.', () => {
    const isWatched = true;

    expect(SavedVideo.instance.filterVideos(isWatched)).toHaveLength(1);
  });

  test('저장은 되었지만, 아직 시청하지 않은 영상들을 불러올 수 있다.', () => {
    const isWatched = false;

    expect(SavedVideo.instance.filterVideos(isWatched)).toHaveLength(1);
  });
});
