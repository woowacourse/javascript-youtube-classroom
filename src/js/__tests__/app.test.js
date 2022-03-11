import { searchVideos } from '../api/api.js';
import { searchVideosMock } from '../__mocks__/api.js';

describe('api', () => {
  describe('searchVideos', () => {
    const request = searchVideosMock || searchVideos;

    test('주어진 검색어에 대한 결과로 1개 이상 10개 이하의 영상과 nextPageToken을 받아야 한다.', () => {
      return request('자바스크립트').then((res) => {
        expect(res.nextPageToken).exists;
        expect(res.items).toHaveLength(10);
      });
    });
    test('주어진 검색어에 대한 결과로 0개의 영상을 받아야 한다.', () => {
      return request('!@#!@$#$!#@!#').then((res) => {
        expect(res.items).toHaveLength(0);
      });
    });
  });
});
