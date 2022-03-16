/* eslint-disable no-undef */
/* eslint-disable max-lines-per-function */

import { ERROR_MESSAGE } from '../../src/js/constants/errorMessage.js';

describe('검색 테스트', () => {
  beforeEach(() => {
    const LOCAL_URL = 'http://localhost:9000/';
    cy.visit(LOCAL_URL);
  });

  it('빈 검색어를 입력하면 alert 창이 나타나야 한다.', () => {
    // given
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#search-modal-button').click();

    // when
    cy.get('#search-button')
      .click()
      .then(() => {
        // then
        expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.EMPTY_KEYWORD);
      });
  });

  it('공백으로만 이루어진 키워드로 검색 시 alert 창이 나타나야한다.', () => {
    // given
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#search-modal-button').click();

    const keyword = '   ';
    cy.get('#search-input-keyword').type(keyword);

    // when
    cy.get('#search-button')
      .click()
      .then(() => {
        // then
        expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.EMPTY_KEYWORD);
      });
  });
});
