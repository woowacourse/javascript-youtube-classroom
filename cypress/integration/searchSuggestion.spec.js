const validSearchInput = 'test';

describe('검색어 추천 테스트', () => {
  beforeEach(() => {
    cy.visit('dist/index.html');
  });

  it('검색어 입력할 경우, 추천 검색어를 보여준다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword')
      .type(validSearchInput)
      .then(() => {
        cy.get('.suggestion').should('be.visible');
        cy.get('#suggestion-list').children().should('have.length', 10);
      });
  });

  it('검색 버튼을 누른 경우, 추천 검색어를 보여주지 않는다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(validSearchInput);

    cy.get('#search-button')
      .click()
      .then(() => {
        cy.get('.suggestion').should('be.hidden');
      });
  });
});
