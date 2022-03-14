import validator from './validator.js';
import { ERROR_MESSAGE } from './constants.js';

describe('입력된 검색 문자열을 확인하여', () => {
  test('비어있는 문자열이라면 error를 throw한다.', () => {
    const inputValue = '  ';
    expect(() => validator.checkSearchInput(inputValue)).toThrowError(ERROR_MESSAGE.EMPTY_INPUT);
  });
});

describe('비디오 id를 LocalStorage에 저장할 때', () => {
  test('비디오 id 리스트가 100 이상이면 error를 throw한다.', () => {
    const videoIdList = Array(100).fill('id');

    expect(() => validator.checkOverVideoIdListMaxLength(videoIdList)).toThrowError(
      ERROR_MESSAGE.OVER_MAX_STORE_LENGTH
    );
  });
});
