import { REDIRECT_SERVER_HOST, YOUTUBE_SEARCH_PATH } from '../../src/constants/youtubeApi';

Cypress.Commands.add('interceptAPIRequest', () => {
  return cy
    .intercept(`${REDIRECT_SERVER_HOST}/${YOUTUBE_SEARCH_PATH}*`, { fixture: 'videoItems' })
    .as(YOUTUBE_SEARCH_PATH);
});
