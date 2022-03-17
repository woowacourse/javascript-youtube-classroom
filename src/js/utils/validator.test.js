import validator from './validator.js';
import { ERROR_MESSAGE } from './constants.js';

test('입력된 검색어가 비어있는 문자열이라면 error를 throw한다.', () => {
  const inputValue = '  ';
  expect(() => validator.checkSearchInput(inputValue)).toThrowError(ERROR_MESSAGE.EMPTY_INPUT);
});

test('비디오 id 리스트가 길이가 100 이상이면 error를 throw한다.', () => {
  const storedVideoList = Array(100).fill('id');

  expect(() => validator.checkStoredVideoListOverMaxLength(storedVideoList)).toThrowError(
    ERROR_MESSAGE.OVER_MAX_STORE_LENGTH
  );
});
