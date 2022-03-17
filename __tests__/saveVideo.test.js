/**
 * @jest-environment jsdom
 */

import SaveVideoManager from '../src/js/Manager/SaveVideoManager';
import Storage from '../src/js/Storage';

describe('Storage 영상 ID 저장 기능 테스트', () => {
  let storage;
  let saveVideoManager;

  beforeEach(() => {
    jest.clearAllMocks();
    storage = new Storage();
    saveVideoManager = new SaveVideoManager(storage);
  });

  it('영상 ID를 저장한다.', () => {
    const videoID = 'testVideoID';
    saveVideoManager.saveVideo(videoID);

    expect(JSON.parse(localStorage.getItem('videos')).find((video) => video.id === videoID)).toBeTruthy();
  });

  it('영상을 이미 저장했는지 확인할 수 있다.', () => {
    const videoID = 'testVideoID';
    saveVideoManager.saveVideo(videoID);

    expect(storage.findVideoById(videoID)).toBeTruthy();
  });
});
