Cypress.Commands.add('searchVideo', () => {
  cy.get('#search-modal-button').click();
  cy.get('#search-input-keyword').type('고양이');
  cy.get('#search-button').click();
});

Cypress.Commands.add('saveVideo', () => {
  cy.searchVideo();
  cy.get('.video-item__save-button').first().click();
  cy.get('#modal-background').click({ force: true });
});
