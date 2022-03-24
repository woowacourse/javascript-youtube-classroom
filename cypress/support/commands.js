Cypress.Commands.add('openModal', () => {
  cy.get('#search-modal-button').click();
});

Cypress.Commands.add('inputKeyword', (keyword) => {
  cy.get('#search-input-keyword').type(keyword);
});

Cypress.Commands.add('searchKeyword', (keyword) => {
  cy.openModal();
  cy.inputKeyword(keyword);
});
