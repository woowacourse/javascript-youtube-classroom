import { MESSAGE, STORAGE_KEY } from '../constants';
import LocalStorageMock from '../LocalStorageMock';

describe('Web Storage 저장 테스트', () => {
  it('Web Storage에 저장이 가능하다.', () => {
    global.localStorage = new LocalStorageMock();

    localStorage.setItem(STORAGE_KEY, 'videoId');
    const videoId = localStorage.getItem(STORAGE_KEY);

    expect(videoId).toContain('videoId');
  });

  it('Web Storage에 100개 이상 저장했을 때 에러가 발생한다.', () => {
    global.localStorage = new LocalStorageMock();

    for (let i = 0; i < 100; i++) {
      localStorage.setItem(STORAGE_KEY, `videoId-${i}`);
    }

    expect(() => localStorage.setItem(STORAGE_KEY, 'videoId-101')).toThrowError(
      MESSAGE.ERROR_EXCESS_SAVE_COUNT,
    );
  });
});
