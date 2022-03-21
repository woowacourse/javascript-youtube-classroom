import { API_PATHS } from '../../src/js/constants/fetcher';

Cypress.Commands.add('showModal', () => {
  cy.get('#search-modal-button').click();
});
Cypress.Commands.add('interceptAPIRequest', (PATH) => {
  const API_URL = 'https://jolly-agnesi-fe3944.netlify.app';
  if (PATH === API_PATHS.SEARCH) {
    return cy.intercept(`${API_URL}/${PATH}*`, { fixture: 'searchResult' }).as(PATH);
  }
  if (PATH === API_PATHS.GET_VIDEO) {
    return cy.intercept(`${API_URL}/${PATH}*`, { fixture: 'video' }).as(PATH);
  }
});
