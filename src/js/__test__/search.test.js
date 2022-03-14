import validator from '../utils/validator.js';
import APIManager from '../managers/APIManager.js';
import { fetchData, errorData, parseData } from '../utils/mockData.js';
import { ERROR_MESSAGE } from '../utils/constants.js';

describe('검색어가 비었을 때 검색을 하면', () => {
  test('검색어가 비어있다는 error가 발생한다.', () => {
    const inputValue = '';
    expect(() => validator.checkValidSearchInput(inputValue)).toThrowError(
      ERROR_MESSAGE.EMPTY_INPUT
    );
  });
});

describe('API 요청이 끝나고', () => {
  test('응답 데이터에 에러가 있는지 확인할 수 있다.', () => {
    expect(() => {
      APIManager.checkResponseError(errorData);
    }).toThrowError();
  });

  test('응답 데이터가 정상인지 확인할 수 있다.', () => {
    expect(APIManager.checkResponseError(fetchData)).toBe(false);
  });

  test('response 데이터를 썸네일 이미지 url, 제목, 작성자, 작성요일, id로 분리할 수 있다.', () => {
    expect(APIManager.parsingVideoData(fetchData)).toEqual(parseData);
  });
});
