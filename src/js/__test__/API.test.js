import videoAPI from '../videoAPI.js';
import { FETCH_DATA, ERROR_DATA, PARSE_DATA } from '../utils/mockData.js';

describe('API 요청이 끝나고', () => {
  test('응답 데이터에 에러가 있는지 확인할 수 있다.', () => {
    expect(() => {
      videoAPI.checkResponseError(ERROR_DATA);
    }).toThrowError();
  });

  test('응답 데이터가 정상인지 확인할 수 있다.', () => {
    expect(videoAPI.checkResponseError(FETCH_DATA)).toBe(false);
  });

  test('response 데이터를 썸네일 이미지 url, 제목, 작성자, 작성요일, id로 분리할 수 있다.', () => {
    expect(videoAPI.parsingVideoData(FETCH_DATA)).toEqual(PARSE_DATA);
  });
});
