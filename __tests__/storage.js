import { ERROR_MESSAGE } from '../src/js/constants';
import Storage from '../src/js/Storage';

describe('Storage 기능 테스트', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it('영상 정보를 저장한다.', () => {
    const newVideo = { id: 'testVideoID', watched: false };
    Storage.saveVideo(newVideo);

    expect(JSON.parse(localStorage.getItem('videos')).find((video) => video.id === newVideo.id)).toBeTruthy();
  });

  it('영상을 이미 저장했는지 확인할 수 있다.', () => {
    const newVideo = { id: 'testVideoID', watched: false };
    Storage.saveVideo(newVideo);

    expect(Storage.findVideoById(newVideo.id)).toBeDefined();
  });

  it('저장되지 않은 영상에 대해 업데이트를 시도하면 에러를 던진다.', () => {
    const unsavedVideo = { id: 'undefinedVideoID' };
    expect(() => Storage.updateVideo(unsavedVideo)).toThrow(ERROR_MESSAGE.CAN_NOT_UPDATE_ON_NOT_SAVED_VIDEO);
  });

  it('저장된 영상 정보는 업데이트 할 수 있다.', () => {
    const video = { id: 'testVideoID', watched: false };
    const updatedVideo = { id: 'testVideoID', watched: true };
    Storage.saveVideo(video);
    Storage.updateVideo(updatedVideo);
    expect(Storage.findVideoById(video.id).watched).toBeTruthy();
  });

  it('저장되지 않은 영상을 삭제하려고 하면 에러를 던진다.', () => {
    const unsavedVideo = { id: 'undefinedVideoID' };
    expect(() => Storage.deleteVideoById(unsavedVideo.id)).toThrow(ERROR_MESSAGE.CAN_NOT_DELETE_ON_NOT_SAVED_VIDEO);
  });

  it('저장된 영상 정보는 삭제할 수 있다.', () => {
    const video = { id: 'testVideoID', watched: false };
    Storage.saveVideo(video);
    Storage.deleteVideoById(video.id);
    expect(Storage.findVideoById(video.id)).toBeUndefined();
  });
});
