// - [ ] 유튜브 검색 API를 사용해 내가 보고 싶은 영상들을 검색할 수 있다.
//   - [ ] 공백인 경우를 체크한다.
//   - [ ] 검색해서 받아 오는지 확인한다.

const axios = require('axios').default;

import SearchVideo from '../searchVideo.js';

const validateSearchInput = (searchInput) => {
  if (!searchInput) {
    throw new Error('공백은 검색할 수 없습니다.');
  }
};

describe('동영샹 검색 테스트', () => {
  test('입력한 검색값이 공백인 경우를 체크한다.', () => {
    const searchInput = '      ';
    expect(() => validateSearchInput(searchInput.trim())).toThrow('공백은 검색할 수 없습니다.');
  });
  
  // const searchVideo = new SearchVideo();
  // test('검색해서 받아 오는지 확인한다.', () => {
  //   const searchResults = searchVideo.searchResults;
  //   console.log(searchResults);
  //   expect(searchResults.length).toBe(10);
  // });
});


