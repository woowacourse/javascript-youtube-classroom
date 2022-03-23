import { ERROR_MESSAGES, MAX_SAVE_AMOUNT } from '../../src/js/constants/constants';

const baseUrl = 'http://localhost:9000';

describe('핵심 기능 플로우 테스트', () => {
  beforeEach(() => {
    cy.visit(baseUrl);
    cy.intercept(
      {
        method: 'GET',
        url: '**/youtube/v3/search?*',
      },
      { fixture: './dummy' }
    ).as('getSearchResult');

    cy.on('window:confirm', () => true);
  });

  it('비디오를 검색해서 저장할 수 있다', () => {
    // given
    cy.searchVideo();
    cy.saveVideo();

    // then
    cy.get('.video-list').children().should('exist');
  });

  it('볼 영상 탭에서 비디오를 본 영상으로 설정하면 본 영상 탭에서 확인할 수 있다.', () => {
    // given
    cy.searchVideo();
    cy.saveVideo();

    // when
    cy.get('.video-item__watched-button').first().click();

    cy.get('#watched-list-button').click();

    // then
    cy.get('.video-list').children().should('exist');
  });

  it('저장한 영상을 삭제할 수 있다.', () => {
    // given
    cy.searchVideo();
    cy.saveVideo();

    cy.get('.saved-videos .video-list')
      .children()
      .as('original')
      .then((original) => {
        //when
        cy.get('.video-item__unsave-button').first().click();

        // then
        cy.get('.saved-videos .video-list')
          .children()
          .should('have.length', original.length - 1);
      });
  });
});

describe('네트워크 및 서버 오류 시 테스트', () => {
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('검색결과가 빈 목록일 시 결과 없음 페이지를 표시한다.', () => {
    // given
    cy.intercept(
      {
        method: 'GET',
        url: '**/youtube/v3/search?*',
      },
      { fixture: './empty' }
    ).as('getSearchResult');

    // when
    cy.searchVideo();

    // then
    cy.get('.no-result').should('be.visible');
    cy.get('.no-result__description').contains(ERROR_MESSAGES.NO_RESULT);
  });

  it('네트워크 오류 시 서버 오류 메시지를 표시한다.', () => {
    // given
    cy.intercept(
      {
        method: 'GET',
        url: '**/youtube/v3/search?*',
      },
      (req) => req.destroy()
    ).as('getSearchResult');

    // when
    cy.searchVideo();

    // then
    cy.get('.no-result').should('be.visible');
    cy.get('.no-result__description').contains(ERROR_MESSAGES.SERVER_ERROR);
  });
});

describe('기타 오류 테스트', () => {
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('빈 칸(값 없음이 아닌 공란)으로 검색하면 검색어를 입력하라는 메시지를 표시한다.', () => {
    cy.intercept({
      method: 'GET',
      url: '**/youtube/v3/search?*',
    }).as('getSearchResult');

    const emptyInput = ' ';

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(emptyInput);

    cy.clickShowsAlert('#search-button', ERROR_MESSAGES.NO_SEARCH_KEYWORD);
  });
});
