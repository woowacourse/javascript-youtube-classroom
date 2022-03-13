import validator from '../utils/validator.js';
import APIManager from '../managers/APIManager.js';
import videoAPICaller from '../managers/videoAPICaller.js';
import { videoData, errorData, parseData } from '../utils/mockData.js';

describe('보고 싶은 영상을 검색 했을 때', () => {
  test('입력 없이 버튼을 눌렀다면 error를 throw한다.', () => {
    const inputValue = '';
    expect(() => validator.isValidSearchInput(inputValue)).toThrowError();
  });
});

describe('API 요청을 하기 전', () => {
  test('endPoint와 params로 requestURL을 만들 수 있다.', () => {
    const endPoint = videoAPICaller.endPoint;
    const params = {
      q: 'woowa',
      type: 'video',
    };

    expect(APIManager.createQueryString(endPoint, params)).toEqual(
      `${videoAPICaller.endPoint}?q=woowa&type=video`
    );
  });
});

describe('API 요청이 끝나고', () => {
  test('response 데이터를 썸네일 이미지 url, 제목, 작성자, 작성요일, id로 분리할 수 있다.', () => {
    expect(videoAPICaller.parsingVideoData(videoData)).toEqual(parseData);
  });
});
