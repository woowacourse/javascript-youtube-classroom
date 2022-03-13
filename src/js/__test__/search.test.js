import validator from '../utils/validator.js';
import APIManager from '../managers/APIManager.js';
import { videoData, errorData, parseData } from '../utils/mockData.js';

describe('보고 싶은 영상을 검색 했을 때', () => {
  test('입력 없이 버튼을 눌렀다면 error를 throw한다.', () => {
    const inputValue = '';
    expect(() => validator.isValidSearchInput(inputValue)).toThrowError();
  });
});

describe('API 요청이 끝나고', () => {
  test('응답 데이터에 에러가 있는지 확인할 수 있다.', () => {
    expect(() => {
      APIManager.checkResponseError(errorData);
    }).toThrowError();
  });

  test('응답 데이터가 정상인지 확인할 수 있다.', () => {
    expect(APIManager.checkResponseError(videoData)).toBe(false);
  });

  test('response 데이터를 썸네일 이미지 url, 제목, 작성자, 작성요일, id로 분리할 수 있다.', () => {
    expect(APIManager.parsingVideoData(videoData)).toEqual(parseData);
  });
});
