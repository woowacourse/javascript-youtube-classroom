import dummyObject from '../dummy/dummyObject.js';
import Video from '../models/Video.js';
import ERROR_MESSAGES from '../../constants/errorMessages.js';
import invalidDummyObject from '../dummy/invalidDummyObject.js';

describe('검색어를 정상적으로 입력해야 한다.', () => {
  test('검색어가 입력되지 않은 경우, 에러를 발생시킨다.', () => {
    const video = new Video();

    const input = '';

    expect(() => {
      video.keyword = input;
    }).toThrowError(ERROR_MESSAGES.EMPTY);
  });
});

// dummyObject는 '우아한테크코스'로 youtube API에 검색하여 fetch했을 때 받아서 저장해둔 데이터입니다.
describe('API에서 데이터가 불러졌을 경우(또는 dummy), 입력된 검색어에 부합하는 데이터를 가져와야한다.', () => {
  class LocalStorageMock {
    store = {};

    constructor() {}

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

  const video = new Video();

  test('API(또는 dummy)에서 가져온 영상들의 제목 또는 설명에 사용자가 입력한 검색어가 포함되어 있어야 한다.', () => {
    const video = new Video();

    const keyword = '우아한테크코스';
    video.setVideoInfo(dummyObject);
    const newVideoItems = video.newVideoItems;

    newVideoItems.forEach((item) => {
      const hasKeyword = { description: item.description.indexOf(keyword), title: item.title.indexOf(keyword) };

      expect(hasKeyword).not.toStrictEqual({ description: -1, title: -1 });
    });
  });

  test('API(또는 dummy)에서 가져온 영상의 데이터(썸네일 사진, 제목, 채널명, 날짜, 링크)가 존재해야한다.', () => {
    const video = new Video();

    video.setVideoInfo(dummyObject);
    const newVideoItems = video.newVideoItems;

    newVideoItems.forEach((item) => {
      expect(item.channelTitle).not.toBe('');
      expect(item.title).not.toBe('');
      expect(item.publishTime).not.toBe('');
      expect(item.thumbnailUrl).toContain('jpg');
      expect(item.videoId).not.toBe('');
    });
  });

  test('API(또는 dummy)에서 가져온 영상의 데이터가 불충분하면, 에러를 발생시킨다.', () => {
    const video = new Video();

    expect(() => {
      video.setVideoInfo(invalidDummyObject);
    }).toThrowError(ERROR_MESSAGES.NOT_FOUND);
  });

  test('저장한 영상을 로컬스토리지에서 불러올 수 있어야 한다.', () => {
    const videoId = 'FMUpVA0Vvjw';
    video.setVideoInfo(dummyObject);
    video.accumulateVideoItems();

    video.setItemsLocalStorage(videoId);

    const [videoItem] = video.getItemsLocalStorage();
    expect(videoItem.videoId).toBe(videoId);
  });
});
