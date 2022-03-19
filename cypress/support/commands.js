import { REDIRECT_SERVER_HOST, YOUTUBE_SEARCH_PATH } from '../../src/constants/youtubeApi';

Cypress.Commands.add('interceptAPIRequest', (PATH) => {
  const API_URL = 'https://jolly-agnesi-fe3944.netlify.app';
  if (PATH === YOUTUBE_SEARCH_PATH) {
    return cy.intercept(`${REDIRECT_SERVER_HOST}/${PATH}*`, { fixture: 'videoItems' }).as(PATH);
  }
});
