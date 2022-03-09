import { setSavedVideos, getSavedVideos } from '../util/storage';

describe('비디오 저장하기 관련 기능 테스트', () => {
  class LocalStorageMock {
    constructor() {
      this.store = {};
    }

    clear() {
      this.store = {};
    }

    getItem(key) {
      return this.store[key] || null;
    }

    setItem(key, value) {
      this.store[key] = String(value);
    }

    removeItem(key) {
      delete this.store[key];
    }
  }

  global.localStorage = new LocalStorageMock();

  test('로컬 저장소에 id를 저장하고 불러올 수 있다.', () => {
    const id = 'sampleId';

    setSavedVideos(id);

    expect(getSavedVideos[id]).toBe(true);
  });
});
