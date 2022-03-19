Cypress.Commands.add('searchVideo', (keyword, result) => {
  cy.intercept('GET', 'https://donkeykong.netlify.app/youtube/v3/*', {
    fixture: result,
  });
  cy.get('#search-input-keyword').type(keyword);
  cy.get('#search-button').click();
});
