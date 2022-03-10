const validateInput = input => {
  if (input === '') {
    throw new Error('msg');
  }
};

class YoutubeMachine {
  search(input) {
    validateInput(input);
    const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=kpop+music';
    fetch(url)
      .then(response => console.log('response:', response))
      .catch(error => console.log('error:', error));
  }
}

/* eslint-disable no-undef */
describe('유튜브 검색 단위 테스트', () => {
  test('입력된 검색어가 없거나, 공백으로 입력된 경우 검색이 안되게한다.', () => {
    const trimedInput = '    '.trim();
    const youtubeMachine = new YoutubeMachine();
    expect(() => youtubeMachine.search(trimedInput)).toThrow(Error);
  });
});
