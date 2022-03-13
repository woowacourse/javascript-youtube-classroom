/**
 * @jest-environment jsdom
 */

import { ALERT_MESSAGE, MAX_SAVE_COUNT } from '../constant.js';
import WebStore from '../store/WebStore.js';

describe('localStorage', () => {
  it('동영상 저장 버튼이 눌러지면, localStorage에 영상이 저장된다.', () => {
    const webStore = new WebStore('saved');
    const videoId = 'F_sOWEje2mE';

    expect(webStore.load()).toEqual([]);
    webStore.save([...webStore.load(), videoId]);
    expect(webStore.load()).toEqual(['F_sOWEje2mE']);
  });

  it(`localStorage에 저장된 영상이 ${MAX_SAVE_COUNT}개를 초과하면, 더 이상 저장되지 않는다.`, () => {
    try {
      const webStore = new WebStore('saved');
      for (let i = 0; i < MAX_SAVE_COUNT; i++) {
        webStore.save([...webStore.load(), i]);
      }
      const videoId = 'F_sOWEje2mE';
      webStore.save([...webStore.load(), videoId]);
    } catch (err) {
      expect(err).toEqual(new Error(ALERT_MESSAGE.EXCEED_MAX_SAVE_VOLUME));
    }

    // const webStore = new WebStore('saved');
    //   for (let i = 0; i < 100; i++) {
    //     webStore.save([...webStore.load(), i]);
    //   }
    //   const videoId = 'F_sOWEje2mE';
    // expect(() => webStore.save([...webStore.load(), videoId])).toThrowError(
    //   ALERT_MESSAGE.EXCEED_MAX_SAVE_VOLUME
    // );
  });
});
