/* eslint-disable no-undef */
/* eslint-disable max-lines-per-function */

import { ERROR_MESSAGE } from '../../src/js/constants/errorMessage.js';

const LOCAL_URL = 'http://localhost:9000/';

describe.only('모달 동작 검사', () => {
  before(() => {
    cy.visit(LOCAL_URL);

    cy.get('#search-modal-button').click();
  });

  it('초기 화면에서 검색 버튼을 누르면 검색 모달 창이 보여야 한다.', () => {
    cy.get('.modal-container').should('be.exist');
  });
});

describe('검색 키워드 유효성 검사', () => {
  beforeEach(() => {
    cy.visit(LOCAL_URL);

    cy.get('#search-modal-button').click();
  });

  it('빈 검색어를 입력하면 alert 창이 나타나야 한다.', () => {
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

  it('공백으로만 이루어진 키워드로 검색 시 alert 창이 나타나야한다.', () => {
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
