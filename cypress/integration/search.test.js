import { API_PATHS } from '../../src/js/constants/fetcher';

describe('사용자는 검색을 통해 영상을 확인할 수 있다.', () => {
  const baseURL = './index.html';
  beforeEach(() => {
    cy.visit(baseURL);

    console.log('check');
    cy.showModal();
  });

  it('모달 버튼을 클릭 후, 검색어를 입력하면 결과를 확인할 수 있다.', () => {
    const validKeyword = '정상검색';

    cy.interceptAPIRequest(API_PATHS.SEARCH);

    cy.get('#search-input-keyword').type(validKeyword);
    cy.get('#search-button').click();

    cy.get('.video-item').should('exist');
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
});
