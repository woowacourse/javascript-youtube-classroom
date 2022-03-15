import { ERROR_MESSAGE } from '../constant';
import SearchMachine from '../domain/SearchMachine';

describe('입력값 검증', () => {
  test('빈 입력값을 입력하면 에러를 던진다.', () => {
    const searchMachine = new SearchMachine();
    expect(() => {
      searchMachine.keyword = '';
    }).toThrowError(ERROR_MESSAGE.NO_INPUT);
  });
});
