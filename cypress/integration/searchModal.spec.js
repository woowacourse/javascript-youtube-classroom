import { MAX_RESULT_COUNT, STORAGE_CAPACITY_FULL } from '../../src/js/constants.js';

describe('검색 모달 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  const KEYWORD = '테코톡';
  const KEYWORD_FOR_NO_RESULT = 'dsflmkfsdlkjweljksf';

  it('검색 모달에서 "엔터키"를 누르면, 최초 검색 결과 10개가 화면에 표시된다.', () => {
    cy.get('#search-button').click();
    cy.get('#search-keyword-input').type(KEYWORD).type('{enter}');

    cy.get('.search-result-group').children().should('have.length', MAX_RESULT_COUNT);
  });

  it('검색 모달에서 "검색 버튼"을 클릭하면, 최초 검색 결과 10개가 화면에 표시된다.', () => {
    cy.get('#search-button').click();
    cy.get('#search-keyword-input').type(KEYWORD);
    cy.get('#search-keyword-button').click();

    cy.get('.search-result-group').children().should('have.length', MAX_RESULT_COUNT);
  });

  it('검색 키워드 제출 후, 데이터를 불러오기 전이면 skeleton UI가 화면에 표시된다.', () => {
    cy.get('#search-button').click();
    cy.get('#search-keyword-input').type(KEYWORD);
    cy.get('#search-keyword-form').submit();

    cy.get('.search-result-group').should('have.class', 'skeleton');
    cy.get('#search-section .video-title').each(($el) => cy.wrap($el).should('have.class', 'line'));
    cy.get('#search-section .channel-title').each(($el) => cy.wrap($el).should('have.class', 'line'));
    cy.get('#search-section .published-at').each(($el) => cy.wrap($el).should('have.class', 'line'));
    cy.get('#search-section .preview-container').each(($el) => cy.wrap($el).should('have.class', 'image'));
  });

  it('검색결과가 없는 경우, 결과없음 이미지가 화면에 표시된다.', () => {
    cy.get('#search-button').click();
    cy.get('#search-keyword-input').type(KEYWORD_FOR_NO_RESULT);
    cy.get('#search-keyword-form').submit();

    cy.get('#search-result-wrapper').find('img').should('have.attr', 'src').should('include', 'not_found');
  });

  it('스크롤바를 최하단으로 이동시킬 경우, 다음 10개 아이템을 추가로 화면에 표시한다.', () => {
    cy.get('#search-button').click();
    cy.get('#search-keyword-input').type(KEYWORD);
    cy.get('#search-keyword-form').submit();

    cy.scrollTo('bottom');
    cy.get('#search-result-wrapper')
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
        expect(list[FIRST_INDEX].videoId).to.be.equal(storedVideoId);
      });
  });

  it('검색 모달에 다시 접근했을 때, 가장 마지막에 검색한 결과를 화면에 표시한다.', () => {
    cy.get('#search-button').click();
    cy.get('#search-keyword-input').type(KEYWORD);
    cy.get('#search-keyword-form').submit();
    cy.get('#modal-close-button').click();

    cy.get('#search-button').click();
    cy.get('#search-result-wrapper')
      .invoke('attr', 'data-search-keyword')
      .then((keyword) => expect(keyword).to.be.equal(KEYWORD));
  });

  it('키워드 4개를 연속해서 검색했을 때, 최근 검색키워드 3개를 검색창 하단에 보여준다.', () => {
    const KEYWORDS = ['우아한형제들', '네이버', '쿠팡', '토스'];
    const TRY_COUNT = KEYWORDS.length;

    cy.get('#search-button').click();
    KEYWORDS.forEach((keyword) => {
      cy.get('#search-keyword-input').clear().type(keyword);
      cy.get('#search-keyword-form').submit();
    });

    cy.get('#recent-keyword')
      .siblings()
      .should('have.length', 3)
      .each(($el, i) => {
        cy.wrap($el).should('have.text', KEYWORDS[TRY_COUNT - 1 - i]);
      });
  });
});

describe('예외 처리 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('100개의 영상을 저장했을 때, 더 저장하려고 시도할 경우 저장용량 초과 메세지를 표시한다.', () => {
    cy.get('#search-button').click();
    cy.get('#search-keyword-input').type(KEYWORD);
    cy.get('#search-keyword-form').submit();

    for (let i = 0; i < 11; i++) {
      cy.scrollTo('bottom');
      cy.wait(500);
    }
    cy.get('.save-button').each(($el, i) => {
      if (i >= 100) {
        return;
      }
      $el.click();
    });
    cy.get('.save-button').eq[100].click();
    cy.get('#snackbar').contains(STORAGE_CAPACITY_FULL);
  });
});
