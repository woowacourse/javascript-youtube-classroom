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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('typeSearchKeywordAndClickToSubmitButton', (keyword) => {
  cy.get('[data-js="youtube-search-modal__input"]').type(keyword);
  cy.get('[data-js="youtube-search-modal__submit"]').click();
});

Cypress.Commands.add('searchAndSave', (keyword) => {
  cy.get('#search-button').click();
  cy.get('[data-js="youtube-search-modal__input"]').type(keyword);
  cy.get('[data-js="youtube-search-modal__submit"]').click();
  cy.get('[data-js="save-button"]').its(0).click();
});
