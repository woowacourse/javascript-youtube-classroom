/* eslint-disable no-undef */
import YoutubeMachine from '../js/domain/YoutubeMachine.js';

describe('유튜브 검색 단위 테스트', () => {
  test('입력된 검색어가 없거나, 공백으로 입력된 경우 검색이 안되게한다.', () => {
    const trimedInput = '    '.trim();
    const youtubeMachine = new YoutubeMachine();
    expect(() => (youtubeMachine.searchTarget = trimedInput)).toThrow(Error);
  });
});
