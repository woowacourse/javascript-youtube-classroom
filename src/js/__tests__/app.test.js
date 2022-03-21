import videoService, { useStore } from '../services/VideoService.js';
import requestMock from '../__mocks__/requestMock.js';
import { ERROR_MESSAGES, SAVED_VIDEO } from '../config/constants.js';
import { validate, queryStringValidator } from '../utils/validator.js';
import { deepEqual } from '../utils/commons.js';

describe('VideoService', () => {
  beforeEach(() => {
    videoService.clear();
  });

  describe('searchVideos', () => {
    test('주어진 검색어에 대한 결과가 rootStore에 저장되어야 한다.', async () => {
      await videoService.searchVideos('some string', null, requestMock.success);

      expect(useStore((state) => state.searchOption.query)).toEqual(
        'some string'
      );
      expect(useStore((state) => state.searchOption.nextPageToken)).exists;
      expect(useStore((state) => state.searchResult)).toHaveLength(10);

      await videoService.searchVideos('!@#!@$#$!#@!#', null, requestMock.fail);

      expect(useStore((state) => state.searchResult)).toHaveLength(0);
    });
  });

  describe('loadNextPage', () => {
    test('10개의 영상이 rootStore에 추가되어야 한다.', async () => {
      await videoService.searchVideos('some string', null, requestMock.success);

      const prevSearchResult = useStore((state) => state.searchResult);

      await videoService.loadNextPage(requestMock.success);

      expect(useStore((state) => state.searchResult)).toHaveLength(
        prevSearchResult.length + 10
      );
    });
  });

  describe('saveVideo', () => {
    test('localStorage에 video를 저장해야한다.', () => {
      const videoId = 'new_video_id';
      const video = {
        videoId: 'new_video_id',
      };

      videoService.saveVideo(video);

      expect(
        JSON.parse(localStorage.getItem(SAVED_VIDEO.KEY)).savedVideos.pop()
          .videoId
      ).toEqual(videoId);
    });

    test('100를 초과하여 저장하려고 하면 에러를 throw해야 한다.', () => {
      expect(() => {
        Array.from({ length: 100 }).forEach((_, index) => {
          videoService.saveVideo({ videoId: `video_${index}` });
        });
      }).not.toThrow();

      expect(() => {
        videoService.saveVideo({ videoId: 'video_100' });
      }).toThrow(ERROR_MESSAGES.SAVED_VIDEOS_OUT_OF_LIMIT);
    });
  });
});

describe('utils', () => {
  describe('validate', () => {
    const validateTest = (testCases, validator) => {
      return () => {
        testCases.forEach((target) => {
          validate(target, validator);
        });
      };
    };

    test('검색어가 유효하면 에러를 throw하지 않아야 한다.', () => {
      const testCases = ['a', 'abcdefghijklmnopqrstuvwxyzABCD'];

      expect(validateTest(testCases, queryStringValidator)).not.toThrow();
    });

    test('검색어가 비어있거나 공백으로 이루어져있으면 에러를 throw해야 한다.', () => {
      const testCases = ['', ' '];

      expect(validateTest(testCases, queryStringValidator)).toThrow(
        ERROR_MESSAGES.QUERY_STRING.EMPTY
      );
    });

    test('검색어가 30자를 초과하면 에러를 throw해야 한다.', () => {
      const testCases = ['abcdefghijklmnopqrstuvwxyzABCDE'];

      expect(validateTest(testCases, queryStringValidator)).toThrow(
        ERROR_MESSAGES.QUERY_STRING.TOO_LONG
      );
    });
  });

  describe.only('deepEqual', () => {
    const randomMapA = new Map();
    const randomMapB = new Map();
    const randomMapC = new Map();

    randomMapA.set(1, 'one');
    randomMapB.set(1, 'one');
    randomMapC.set(1, 'two');

    test('두 오브젝트가 같으면 true를 반환해야 한다.', () => {
      const a = {
        AA: {
          AAA: {
            A: 1,
            B: ['wow', new Set([1, 2])],
          },
        },
        BB: 0,
        CC: NaN,
        DD: randomMapA,
      };

      const b = {
        AA: {
          AAA: {
            A: 1,
            B: ['wow', new Set([1, 2])],
          },
        },
        BB: 0,
        CC: NaN,
        DD: randomMapB,
      };

      expect(deepEqual(a, b)).toEqual(true);
    });

    test('두 오브젝트가 다르면 false를 반환해야 한다.', () => {
      const a = {
        AA: {
          AAA: {
            A: 1,
            B: ['wow', new Set([1, 2])],
          },
        },
        BB: 0,
        CC: NaN,
        DD: randomMapA,
      };
      const b = {
        AA: {
          AAA: {
            A: 1,
            B: ['wow', new Set([1, 2])],
          },
        },
        BB: 0,
        CC: NaN,
        DD: randomMapC,
      };

      expect(deepEqual(a, b)).toEqual(false);
    });
  });
});
