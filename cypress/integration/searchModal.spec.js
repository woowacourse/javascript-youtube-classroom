import { MAX_RESULT_COUNT } from '../../src/js/constants.js';
import { getItemFromLocalStorage } from '../../src/js/utils/localStorage.js';

describe('검색 모달 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  const KEYWORD = '테코톡';
  const KEYWORD_FOR_NO_RESULT = 'dsflmkfsdlkjweljksf';

  it('검색 모달에서 "엔터키"를 누르면, 최초 검색 결과 10개가 화면에 표시된다.', () => {
    cy.get('#search-button').click();
    cy.get('#search-keyword-input').type(KEYWORD).type('{enter}');

    cy.get('#search-result-video-wrapper').children().should('have.length', MAX_RESULT_COUNT);
  });

  it('검색 모달에서 "검색 버튼"을 클릭하면, 최초 검색 결과 10개가 화면에 표시된다.', () => {
    cy.get('#search-button').click();
    cy.get('#search-keyword-input').type(KEYWORD);
    cy.get('#search-keyword-button').click();

    cy.get('#search-result-video-wrapper').children().should('have.length', MAX_RESULT_COUNT);
  });

  it('검색 키워드 제출 후, 데이터를 불러오기 전이면 skeleton UI가 화면에 표시된다.', () => {
    cy.get('#search-button').click();
    cy.get('#search-keyword-input').type(KEYWORD);
    cy.get('#search-keyword-form').submit();

    cy.get('#search-result-video-wrapper').should('have.class', 'skeleton');
    cy.get('.preview-container').each(($el) => cy.wrap($el).should('have.class', 'image'));
    cy.get('.video-title').each(($el) => cy.wrap($el).should('have.class', 'line'));
    cy.get('.channel-title').each(($el) => cy.wrap($el).should('have.class', 'line'));
    cy.get('.published-at').each(($el) => cy.wrap($el).should('have.class', 'line'));
  });

  it('검색결과가 없는 경우, 결과없음 이미지가 화면에 표시된다.', () => {
    cy.get('#search-button').click();
    cy.get('#search-keyword-input').type(KEYWORD_FOR_NO_RESULT);
    cy.get('#search-keyword-form').submit();

    cy.get('#search-result-video-wrapper').find('img').should('have.attr', 'src').should('include', 'not_found');
  });

  it('스크롤바를 최하단으로 이동시킬 경우, 다음 10개 아이템을 추가로 화면에 표시한다.', () => {
    cy.get('#search-button').click();
    cy.get('#search-keyword-input').type(KEYWORD);
    cy.get('#search-keyword-form').submit();

    cy.scrollTo('bottom');
    cy.get('#search-result-video-wrapper')
      .children()
      .should('have.length', MAX_RESULT_COUNT * 2);
  });

  it('저장버튼을 누르면 localStorage에 해당 영상이 저장된다.', () => {
    const FIRST_INDEX = 0;

    cy.get('#search-button').click();
    cy.get('#search-keyword-input').type(KEYWORD);
    cy.get('#search-keyword-form').submit();

    cy.get('.save-button')
      .eq(FIRST_INDEX)
      .click()
      .invoke('attr', 'data-video-id')
      .then((storedVideoId) => {
        const list = JSON.parse(localStorage.getItem('videosToWatch'));
        expect(list[FIRST_INDEX].videoId).to.eq(storedVideoId);
      });
  });
});
