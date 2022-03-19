import { REDIRECT_SERVER_HOST, YOUTUBE_SEARCH_PATH } from '../../src/constants/youtubeApi';
import ERROR_MESSAGES from '../../src/constants/errorMessages';

describe("[API를 fixture로 대체] 1. [영상 검색 모달 화면]에서 '영상 검색, 렌더링, 저장' 테스트", () => {
  const inputKeyword = '우아한테크코스';

  beforeEach(() => {
    cy.openSearchModal();

    cy.intercept('GET', `${REDIRECT_SERVER_HOST}/${YOUTUBE_SEARCH_PATH}*`, { fixture: 'videoItems' });
  });

  it("1-1. 검색어 입력 후 '검색' 버튼을 누르면, 검색된 영상이 표시된다.", () => {
    cy.searchKeyword(inputKeyword);

    cy.get('.video-item').should('be.visible');
  });

  it('1-2. 검색 결과 스크롤 바를 끝까지 내리면 추가 영상 10개를 표시한다.', () => {
    cy.searchKeyword(inputKeyword);

    cy.scrollNextPage('.video-item', 500);

    cy.get('.video-list').children('.video-item').should('have.length', 20);
  });

  it("1-3. '저장' 버튼을 누르면, 선택한 영상의 '저장' 버튼이 '저장됨'으로 변경되어 표시되어야 한다.", () => {
    cy.searchKeyword(inputKeyword, 100);

    cy.get('.video-item__save-button').first().click();

    cy.get('.video-item__save-button').first().should('have.class', 'saved-button');
  });

  it("1-4. '저장' 버튼을 누르면, '볼 영상' 탭에 해당 영상이 표시되어야 한다.", () => {
    cy.searchKeyword(inputKeyword, 100);

    cy.get('.video-item__save-button').first().click();
    cy.get('.video-item__save-button')
      .first()
      .invoke('data', 'id')
      .then((savedVideoId) => {
        cy.wrap(savedVideoId).as('savedVideoId');
      });
    cy.get('.dimmer').click({ force: true });

    cy.get('@savedVideoId').then((savedVideoId) => {
      cy.get('.unwatched-tab').children('.video-item').first().should('have.id', savedVideoId);
    });
  });

  it("1-5. 검색어를 입력하지 않고 '검색' 버튼을 누르면, 영상들이 표시되지 않고 에러 Toast 팝업이 표시되어야 한다.", () => {
    cy.get('.search-input__keyword').type('뭐라고 쓰다가 다 지울 예정인 인풋 값').clear();
    cy.get('.search-input__search-button').click();

    cy.get('.video-item').should('not.exist');
    cy.get('.toast--error').should('contain', ERROR_MESSAGES.EMPTY);
  });

  it('1-6. 저장된 영상의 개수가 100개를 초과하면 더 이상 저장할 수 없다는 에러 Toast 팝업이 표시되어야 한다.', () => {
    cy.searchKeyword(inputKeyword);
    for (let index = 1; index <= 10; index++) {
      cy.scrollNextPage('.video-item', 500);
    }

    cy.get('.video-item__save-button').click({ multiple: true });

    cy.get('.toast--error').should('contain', ERROR_MESSAGES.EXCEED_LIMIT);
  });
});

describe("[API 사용] 1. [영상 검색 모달 화면]에서 '영상 검색, 렌더링, 저장' 테스트", () => {
  it("1-7. 검색결과가 없을 검색어를 입력하고 '검색' 버튼을 누르면, 영상들이 표시되지 않고 에러 Toast 팝업이 표시되어야 한다.", () => {
    cy.openSearchModal();

    const invalidInput =
      "!@#!@$!#%@$^#%&$^*%!@#!$!#%&(^*#%$!@#!@$#$!#@!#)_)&_%^_)&%_^)&_@!@#!#$@#$%$@#^%&$%^&#$@$^#%&$%^$^%*$^&^@#$@#$@#%@#$^#%&^**#^#$%@#$@#$^@#$!$@#%@#$%#$^#$%^$%@#$!@#!@#%)^_&)%_^$%#$%#$^#%^#%^#^&_%^_)&_#$)%_)#_$)%#_$%!@#!@$#$!#@!#)_)&_%^_)&%_^)&_%)^_&)%_^&_%^_)&_#$)%_)#_$)%#_$%'";

    cy.searchKeyword(invalidInput, 100);

    cy.get('.video-item').should('not.exist');
    cy.get('.toast--error').should('contain', ERROR_MESSAGES.NOT_FOUND);
  });
});
