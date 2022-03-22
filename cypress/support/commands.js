Cypress.Commands.add('search', keyword => {
  cy.get('#search-modal-button').click();

  cy.intercept('GET', 'https://keen-lamport-feb29e.netlify.app/youtube/v3/search*', {
    fixture: './searchData.json',
  });
  cy.get('#search-input-keyword').type(keyword);
  cy.get('#search-button').click();
});

Cypress.Commands.add('save', idx => {
  cy.get('.video-item__save-button').eq(idx).click();
});
