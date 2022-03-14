import validator from './validator.js';
import { ERROR_MESSAGE } from './constants.js';

describe('보고 싶은 영상을 검색 했을 때', () => {
  test('입력 없이 버튼을 눌렀다면 error를 throw한다.', () => {
    const inputValue = '';
    expect(() => validator.isValidSearchInput(inputValue)).toThrowError(ERROR_MESSAGE.EMPTY_INPUT);
  });
});

describe('저장하기 버튼을 눌렸을 때', () => {
  test('비디오 id 리스트가 100 이상이면 error를 throw한다.', () => {
    const videoIdList = Array(100).fill('id');

    expect(() => validator.checkOverVideoIdListMaxLength(videoIdList)).toThrowError(
      ERROR_MESSAGE.OVER_MAX_STORE_LENGTH
    );
  });
});
