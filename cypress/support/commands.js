Cypress.Commands.add('searchKeyword', (keyword) => {
  cy.get('#search-modal-button').click();
  cy.get('#search-input-keyword').type(keyword);
  cy.get('#search-button').click();
});
