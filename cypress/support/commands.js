// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

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
