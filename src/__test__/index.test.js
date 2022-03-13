/* eslint-disable no-undef */
import YoutubeMachine from '../js/domain/YoutubeMachine.js';
import storage from '../js/storage/storage.js';
import dummyData from '../../dummyData.js';

describe('유튜브 검색 앱 테스트', () => {
  test('입력된 검색어가 없으면, 에러 메시지를 보여준다.', () => {
    const youtubeMachine = new YoutubeMachine();
    const searchInput = '';

    expect(() => (youtubeMachine.searchTarget = searchInput)).toThrow(Error);
  });

  test('정상으로 데이터를 받아오면, 데이터가 필요한 프로퍼티를 가지고 있는지 확인한다.', () => {
    const youtubeMachine = new YoutubeMachine();
    youtubeMachine.data = dummyData;

    youtubeMachine.data.items.forEach(video => {
      expect(video).toHaveProperty('id');
      expect(video.snippet).toHaveProperty('title');
      expect(video.snippet).toHaveProperty('channelTitle');
      expect(video.snippet).toHaveProperty('thumbnails');
      expect(video.snippet).toHaveProperty('publishedAt');
    });
  });

  test('유튜브 영상 id를 webstorage에 저장할 수 있다.', () => {
    const videoId = 'eMf0jojpdJQ';

    storage.saveVideo(videoId);

    expect(storage.getLocalStorage()).toEqual([videoId]);
  });

  test('중복된 유튜브 영상 id는 webstorage에 저장할 수 없다.', () => {
    const videoId = 'eMf0jojpdJQ';

    storage.saveVideo(videoId);
    storage.updateLocalStorage(videoId);

    expect(storage.getLocalStorage()).toHaveLength(1);
  });
});
