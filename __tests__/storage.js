/**
 * @jest-environment jsdom
 */

import Storage from '../src/js/Storage';

describe('Storage 기능 테스트', () => {

  beforeEach(() => {
  });

  it('영상 정보를 저장한다.', () => {
    const newVideo = { id: 'testVideoID' };
    Storage.saveVideo(newVideo);

    expect(JSON.parse(localStorage.getItem('videos')).find((video) => video.id === newVideo.id)).toBeTruthy();
  });

  it('영상을 이미 저장했는지 확인할 수 있다.', () => {
    const newVideo = { id: 'testVideoID' };
    Storage.saveVideo(newVideo);

    expect(Storage.findVideoById(newVideo.id)).toBeDefined();
  });


});
