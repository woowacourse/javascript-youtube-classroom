import storage from '../domain/storage';
import LocalStorageMock from './LocalStorageMock';

global.localStorage = new LocalStorageMock();

describe('비디오 저장하기 관련 기능 테스트', () => {
  test('로컬 저장소에 id를 저장하고 불러올 수 있다.', () => {
    const id = 'sampleId';

    storage.setSavedVideos(id);

    expect(storage.getSavedVideos()[id]).toBe(true);
  });
});
