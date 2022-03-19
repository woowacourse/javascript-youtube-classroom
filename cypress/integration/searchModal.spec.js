// - [영상 검색 모달 화면]에서 '영상 검색, 렌더링, 저장' 테스트

//   - [ ] 검색어 입력 후 '검색' 버튼을 누르면, 검색된 영상이 표시된다.
//     - [ ] 검색 결과 스크롤 바를 끝까지 내리면 새로운 영상 10개를 추가로 사용자에게 보여준다
//     - [ ] '저장' 버튼을 누르면, 선택한 영상의 '저장' 버튼이 '저장됨'으로 변경된다.
//     - [ ] 이미 '저장'한 영상인 경우, 재검색했을 때도 '저장' 버튼이 '저장됨'으로 표시되어 있어야 한다.
//   - [ ] 검색어를 입력하지 않고 '검색' 버튼을 누르면 에러 Toast 팝업이 표시된다.
import { REDIRECT_SERVER_HOST, YOUTUBE_SEARCH_PATH } from '../../src/constants/youtubeApi';
const baseUrl = 'http://localhost:9000/';
// const baseUrl = './index.html';
describe("1. [영상 검색 모달 화면]에서 '영상 검색, 렌더링, 저장' 테스트", () => {
  beforeEach(() => {
    cy.visit(baseUrl);
    cy.get('.nav-right__button').click();
  });

  it("1-1. 검색어 입력 후 '검색' 버튼을 누르면, 검색된 영상이 표시된다.", () => {
    const inputKeyword = '우아한테크코스';
    cy.intercept('GET', `${REDIRECT_SERVER_HOST}/${YOUTUBE_SEARCH_PATH}*`, { fixture: 'videoItems' }).as(
      YOUTUBE_SEARCH_PATH,
    );
    cy.get('.search-input__keyword').type(inputKeyword);
    cy.get('.search-input__search-button').click();
    // cy.wait(['videoItems']);

    cy.get('.video-item').should('exist');
  });
});
