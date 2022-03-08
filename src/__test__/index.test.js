// #### 검색
// - [ ] 유튜브 검색 API를 사용해 내가 보고 싶은 영상들을 검색할 수 있다.
//   - [x] 입력 예외 처리
//     - [x] 입력된 검색어가 없거나, 공백만 입력된 경우 검색이 안되게 한다.

// #### 검색 결과
// - [ ] 최초 검색 결과는 10개까지만 불러온다.

// #### 저장
// - [ ] 내가 검색한 영상들의 저장할 수 있다.
//   - [ ] 저장되는 영상의 형태는 json 데이터이다.
//   - [ ] 실제로 동영상을 저장하는 것이 아니라, 영상 id를 Web Storage에 저장한다.
//   - [ ] 저장 가능한 최대 동영상의 갯수는 100개이다.
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
