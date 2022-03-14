import SaveVideoManager from '../src/js/SaveVideoManager';

describe('localStorage에 영상 ID 저장 기능 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('영상을 저장했는지 확인할 수 있다.', () => {
    const videoID = 'testVideoID';

    const saveVideoManager = new SaveVideoManager();
    saveVideoManager.saveVideoById(videoID);

    expect(saveVideoManager.findVideoById(videoID)).toBeTruthy();
  });
});
