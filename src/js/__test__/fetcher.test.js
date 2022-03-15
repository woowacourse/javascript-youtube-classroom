import { API_PATHS } from '../constants/fetcher';
import { youtubeAPIFetcher } from '../modules/fetcher';
import dummyVideo from './dummy/dummy.json';
describe('fetcher 모듈 테스트', () => {
  global.API_URL = 'https://jolly-agnesi-fe3944.netlify.app';

  test('비디오 데이터를 응답한다', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve(dummyVideo) })
    );
    const video = await youtubeAPIFetcher({
      path: API_PATHS.SEARCH,
      parmas: {
        q: 'keyword',
        part: 'snippet',
        maxResults: 10,
        type: 'video',
        pageToken: '',
      },
    });
    expect(video).toEqual(dummyVideo);
  });

  test('잘못된 요청의 경우 에러를 throw한다', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: false, json: () => Promise.resolve(dummyVideo) })
    );
    expect(
      youtubeAPIFetcher({
        path: API_PATHS.SEARCH,
        parmas: {
          q: 'keyword',
          part: 'snippet',
          maxResults: 10,
          type: 'video',
          pageToken: '',
        },
      })
    ).rejects.toThrow();
  });
});
