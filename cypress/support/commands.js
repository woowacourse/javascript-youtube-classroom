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

Cypress.Commands.add('hasCountVideoItems', ($container, count) => {
  cy.get($container).find('.video-item').should('have.length', count);
});

Cypress.Commands.add('watchVideo', ($container) => {
  cy.get($container).find('.video-item').first().find('.video-item__watch-button').click();
});

Cypress.Commands.add('deleteVideo', ($container) => {
  cy.get($container).find('.video-item').first().find('.video-item__delete-button').click();
});
