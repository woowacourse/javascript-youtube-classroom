/**
 * @jest-environment jsdom
 */

import { getSearchAPI } from '../api/api.js';
import { makeCardData } from '../components/SearchModal/SearchBar.js';
import { ALERT_MESSAGE, MAX_SAVE_COUNT } from '../constant.js';
import WebStore, { webStore } from '../store/WebStore.js';
import { requestMockData } from '../__mocks__/request.js';
import { expect } from '@jest/globals';

describe('localStorage', () => {
  const webStore = new WebStore('saved');

  beforeEach(() => {
    webStore.clear();
  });

  it('동영상 저장 버튼이 눌러지면, localStorage에 영상이 저장된다.', () => {
    const videoId = 'F_sOWEje2mE';

    expect(webStore.load()).toEqual([]);
    webStore.save([...webStore.load(), videoId]);
    expect(webStore.load()).toEqual(['F_sOWEje2mE']);
  });

  it(`localStorage에 저장된 영상이 ${MAX_SAVE_COUNT}개를 초과하면, 더 이상 저장되지 않는다.`, () => {
    expect(() => {
      for (let i = 0; i < MAX_SAVE_COUNT + 1; i++) {
        webStore.save([...webStore.load(), i]);
      }
    }).toThrowError(ALERT_MESSAGE.EXCEED_MAX_SAVE_VOLUME);
  });

  it('본/볼 영상이 변경될 수 있다.', async () => {
    const [error, data] = await getSearchAPI(
      'something',
      null,
      requestMockData.success
    );
    const video = makeCardData(data.items, webStore.load())[0];

    webStore.saveVideo(video);
    expect(webStore.load()[0].watched).toBeFalsy();

    webStore.changeWatchedInLocalStorage(video.videoId);
    expect(webStore.load()[0].watched).toBeTruthy();
  });

  it('저장된 영상을 삭제할 수 있다.', async () => {
    const [error, data] = await getSearchAPI(
      'something',
      null,
      requestMockData.success
    );
    const video = makeCardData(data.items, webStore.load())[0];

    webStore.saveVideo(video);
    expect(webStore.load()).toHaveLength(1);

    webStore.deleteVideoInLocalStorage(video.videoId);
    expect(webStore.load()).toHaveLength(0);
  });
});

describe('데이터 가공', () => {
  it('API 데이터를 받아오고, saved를 저장한다.', async () => {
    const [error, data] = await getSearchAPI(
      'something',
      null,
      requestMockData.success
    );

    const videos = makeCardData(data.items, webStore.load());
    videos.forEach(video => {
      expect(Object.keys(video)).toEqual([
        'videoId',
        'thumbnailUrl',
        'title',
        'channelTitle',
        'publishTime',
        'saved',
      ]);
    });
  });
});
