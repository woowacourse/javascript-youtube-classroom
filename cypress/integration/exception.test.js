import { API_PATHS } from '../../src/js/constants/fetcher';
import noneSearchResult from '../fixtures/noneSearchResult.json';
describe('사용자의 검색 행위에 대한 예외 사항 테스트', () => {
  const baseURL = 'http://localhost:9000/';
  beforeEach(() => {
    cy.visit(baseURL);
    cy.showModal();
  });

  it('빈 검색어를 입력하면 경고창을 확인하게 된다.', () => {
    const inValidKeyword = ' ';

    const stub = cy.stub();

    cy.interceptAPIRequest(API_PATHS.SEARCH);

    cy.on('window:alert', stub);

    cy.get('#search-input-keyword').type(inValidKeyword);
    cy.get('#search-button')
      .click()
      .then(() => {
        expect(stub).to.be.called;
      });
  });

  it('검색 결과가 없다면, 검색 결과 없음 UI를 보게된다.', () => {
    const API_URL = 'https://jolly-agnesi-fe3944.netlify.app';

    const inValidKeyword = '#!#$%$*!@*%$&!@(%*!@(%*!@%()@!($)!*@*5&*!@5@!';

    const stub = cy.stub();

    cy.intercept(`${API_URL}/${API_PATHS.SEARCH}*`, { fixture: 'noneSearchResult' }).as(
      API_PATHS.SEARCH
    );

    cy.on('window:alert', stub);

    cy.get('#search-input-keyword').type(inValidKeyword);
    cy.get('#search-button')
      .click()
      .then(() => {
        cy.get('.no-result:not(.no-result.hide)').should('exist');
      });
  });
});
