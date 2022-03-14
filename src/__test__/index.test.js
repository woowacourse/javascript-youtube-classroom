/* eslint-disable no-undef */
import YoutubeMachine from '../js/domain/YoutubeMachine.js';
import storage from '../js/storage/storage.js';
import { MAX_VIDEO_COUNT } from '../js/constants/constants.js';

describe('유튜브 검색 앱 테스트', () => {
  test('입력된 검색어가 없으면, 에러 메시지를 보여준다.', () => {
    const youtubeMachine = new YoutubeMachine();
    const searchInput = '';

    expect(() => (youtubeMachine.searchTarget = searchInput)).toThrow(Error);
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

  test('유튜브 영상 id는 100개 초과로 저장 할 수 없다.', () => {
    const videoId = 'eMf0jojpdJQ';
    const savedId = Array.from({ length: MAX_VIDEO_COUNT }, () => videoId);

    // 100개를 저장하고, 1개를 더 시도 한다
    storage.setLocalStorage(savedId);
    storage.updateLocalStorage(videoId);

    expect(storage.getLocalStorage()).toHaveLength(MAX_VIDEO_COUNT);
  });
});
