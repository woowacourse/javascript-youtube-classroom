import Validator from '../js/Interactor/Validator.js';
import { ERROR_MESSAGE } from '../js/constants/index.js';

test('빈 값을 입력하면 에러가 발생해야 한다.', () => {
  const value = '';
  const test = () => Validator.checkKeyword(value);

  expect(test).toThrow(ERROR_MESSAGE.EMPTY_KEYWORD);
});
