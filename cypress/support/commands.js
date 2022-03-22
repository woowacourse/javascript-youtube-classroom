import { REDIRECT_SERVER_HOST, YOUTUBE_SEARCH_PATH } from '../../src/constants/youtubeApi';

Cypress.Commands.add('interceptAPIRequest', () => {
  return cy
    .intercept(`${REDIRECT_SERVER_HOST}/${YOUTUBE_SEARCH_PATH}*`, { fixture: 'videoItems' })
    .as(YOUTUBE_SEARCH_PATH);
});

Cypress.Commands.add('scrollNextPage', (target, waitTime) => {
  cy.get(target)
    .last()
    .scrollIntoView({ offset: { top: 50, left: 0 } })
    .wait(waitTime);
});

Cypress.Commands.add('searchKeyword', (inputKeyword, waitTime = 0) => {
  cy.get('.search-input__keyword').type(inputKeyword);
  cy.get('.search-input__search-button').click().wait(waitTime);
});

Cypress.Commands.add('openSearchModal', () => {
  const baseUrl = 'http://localhost:9000/';
  cy.visit(baseUrl);
  cy.get('.nav-right__button').click();
});
