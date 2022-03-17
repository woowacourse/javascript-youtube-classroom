/* eslint-disable no-undef */
/* eslint-disable max-lines-per-function */

import { ERROR_MESSAGE } from '../../src/js/constants/errorMessage.js';

const LOCAL_URL = 'http://localhost:9000/';
const API_URL = 'https://practical-nightingale-c76b8a.netlify.app/youtube/v3/search?*';

describe('모달 동작 검사', () => {
  before(() => {
    const viewportWidth = 1920;
    const viewportHeight = 975;

    cy.viewport(viewportWidth, viewportHeight);
  });

  beforeEach(() => {
    cy.visit(LOCAL_URL);

    cy.get('#search-modal-button').click();
  });

  it('초기 화면에서 검색 버튼을 누르면 검색 모달 창이 보여야 한다.', () => {
    cy.get('.modal-container').should('be.exist');
  });

  it('검색 모달 창이 보이는 상태에서 어두운 영억(dimmed layer)를 클릭하면 모달 창이 안보여야 한다.', () => {
    cy.get('.modal-container').click('top');
    cy.get('.modal-container').should('not.visible');
  });
});

describe('검색 키워드 유효성 검사', () => {
  beforeEach(() => {
    cy.visit(LOCAL_URL);

    cy.get('#search-modal-button').click();
  });

  it('빈 검색어를 입력하면 에러 메시지를 확인할 수 있어야 한다..', () => {
    // given
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    // when
    cy.get('#search-button')
      .click()
      .then(() => {
        // then
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.EMPTY_KEYWORD);
      });
  });

  it('공백으로만 이루어진 키워드로 검색 시 에러 메시지를 확인할 수 있어야 한다.', () => {
    // given
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    const searchKeyword = '   ';
    cy.get('#search-input-keyword').type(searchKeyword);

    // when
    cy.get('#search-button')
      .click()
      .then(() => {
        // then
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.EMPTY_KEYWORD);
      });
  });
});

describe('검색 후 렌더링 검사', () => {
  beforeEach(() => {
    cy.visit(LOCAL_URL);

    cy.get('#search-modal-button').click();
  });

  it('적절한 검색어(검색 결과가 있는 검색어)로 검색 시 영상 카드가 화면에 보여져야한다.', () => {
    const searchKeyword = '우테코';
    const expectedVideoItemCount = 10;

    cy.intercept(API_URL, { fixture: 'searchResultData.json' }).as('requestVideo');

    cy.get('#search-input-keyword').type(searchKeyword);

    // when
    cy.get('#search-button').click();
    cy.wait('@requestVideo');

    // then
    cy.get('.video-item').should('have.length', expectedVideoItemCount);
  });

  it('검색 결과가 없는 검색어로 검색 시 "검색 결과가 없습니다 다른 키워드로 검색해보세요" 문구가 화면에 보여져야 한다.', () => {
    const searchKeyword =
      '!@%23!@$!%23%@$^%23%%26$^%!@%23!$!%23%%26(^%23%$!@%23!@$%23$!%23@!%23))%26%^)%26%^)%26@!@%23!%23$@%23$%$@%23^%%26$%^%26%23$@$^%23%%26$%^$^%*$^%26^@%23$@%23$@%23%@%23$^%23%%26^**%23^%23$%@%23$@%23$^@%23$!$@%23%@%23$%%23$^%23$%^$%@%23$!@%23!@%23%)^%26)%^$%%23$%%23$^%23%^%23%^%23^%26%^)%26%23$)%)%23$)%%23$%!@%23!@$%23$!%23@!%23))%26%^)%26%^)%26%)^%26)%^%26%^)%26%23$)%)%23$)%%23$%';

    const expectedNoneResultMessage = '검색 결과가 없습니다.다른 키워드로 검색해보세요.';

    cy.intercept(API_URL, { fixture: 'searchResultNoneData.json' }).as('requestVideo');

    cy.get('#search-input-keyword').type(searchKeyword);

    // when
    cy.get('#search-button').click();
    cy.wait('@requestVideo');

    // then
    cy.get('.no-result').should('be.visible');
    cy.get('.no-result__description').should('have.text', expectedNoneResultMessage);
  });
});
