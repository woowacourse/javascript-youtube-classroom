import { ERROR_MESSAGE } from '../constant';
import searchMachine from '../domain/SearchMachine';
describe('입력값 검증', () => {
  test('빈 입력값을 입력하면 에러를 던진다.', () => {
    expect(() => {
      searchMachine.changeKeyword('');
    }).toThrowError(ERROR_MESSAGE.NO_INPUT);
  });
});
