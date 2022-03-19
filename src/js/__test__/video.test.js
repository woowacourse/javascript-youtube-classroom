import { ERROR_MESSAGE } from '../constant';
import VideoFactory from '../domain/VideoFactory';
import * as validator from '../util/validator';

validator.checkSavedVideo = jest.fn().mockImplementation(() => {
  return true;
});
const localStorage = {
  save: [],
  watched: [],
};
const localStorageMock = {
  getItem: jest.fn().mockImplementation((key) => {
    return localStorage[key];
  }),
  setItem: jest.fn().mockImplementation((key, item) => {
    localStorage[key] = item;
  }),
  clear: jest.fn(),
};
JSON.parse = jest.fn().mockImplementation((item) => {
  return item;
});
global.localStorage = localStorageMock;
describe('video생성 테스트', () => {
  describe('올바르게 video가 생성되었는지 테스트', () => {
    let video;
    let item;
    beforeEach(() => {
      item = {
        id: { videoId: 'testId' },
        snippet: {
          thumbnails: {
            high: { url: 'testUrl' },
          },
          channelTitle: 'testChannel',
          title: 'testTitle',
          publishTime: 'Time',
        },
      };
      video = VideoFactory.generate(item);
    });
    test('올바른 id가 들어가있는가?', () => {
      expect(video.id).toBe('testId');
    });
    test('올바른 thumbnails가 들어가있는가?', () => {
      expect(video.thumbnails).toBe('testUrl');
    });
    test('올바른 channel이 들어가있는가?', () => {
      expect(video.channelTitle).toBe('testChannel');
    });
    test('올바른 title이 들어가있는가?', () => {
      expect(video.title).toBe('testTitle');
    });
    test('올바른 publishTime이 들어가있는가?', () => {
      expect(video.publishTime).toBe('Time');
    });
    test('올바른 isSaved가 들어가있는가?', () => {
      expect(video.isSaved).toBe(true);
    });
    test('id가 없을 때 에러가 호출 되는가', () => {
      item.id.videoId = undefined;
      const generate = () => {
        video = VideoFactory.generate(item);
      };
      expect(generate).toThrow(new Error(ERROR_MESSAGE.NO_ID));
    });
  });
});
