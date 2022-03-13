import { MESSAGE, STORAGE_KEY } from '../constants';
import { store } from '../domain/store';
import LocalStorageMock from '../LocalStorageMock';

describe('Web Storage 저장 테스트', () => {
  beforeEach(() => {
    global.localStorage = new LocalStorageMock();
  });

  it('Web Storage에 저장이 가능하다.', () => {
    store.setLocalStorage(STORAGE_KEY, 'videoId');
    const saveDatas = store.getLocalStorage(STORAGE_KEY);

    expect(saveDatas).toContain('videoId');
  });

  it('Web Storage에 100개 이상 저장했을 때 에러가 발생한다.', () => {
    for (let i = 0; i < 100; i++) {
      store.setLocalStorage(STORAGE_KEY, `videoId-${i}`);
    }

    expect(() =>
      store.setLocalStorage(STORAGE_KEY, 'videoId-101'),
    ).toThrowError(MESSAGE.ERROR_EXCESS_SAVE_COUNT);
  });
});
