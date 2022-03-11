/**
 * @jest-environment jsdom
 */

import WebStore from '../store/WebStore';

describe('localStorage', () => {
  it('동영상 저장 버튼이 눌러지면, localStorage에 영상이 저장된다.', () => {
    const webStore = new WebStore();
    const videoId = 'F_sOWEje2mE';

    webStore.save(videoId);
    expect(webStore.load()).not.toBe(null);
  });
});
