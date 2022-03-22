import { SELECTOR } from './constants.js';

Cypress.Commands.add('searchSaveEvent', searchInput => {
  cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();
  cy.get(SELECTOR.SEARCH_INPUT).type(searchInput);
  cy.get(SELECTOR.SEARCH_BUTTON)
    .click()
    .wait(1000)
    .then(() => {
      cy.get(SELECTOR.VIDEO_SAVE_BUTTON).first().click();
      cy.get(SELECTOR.VIDEO_SAVE_BUTTON).first().should('not.be.visible');
    });
});

Cypress.Commands.add('checkVideoId', (selector, isWatched) => {
  let videoId = '';
  cy.searchSaveEvent('우테코');
  cy.get(SELECTOR.VIDEO_ITEM)
    .first()
    .invoke('attr', 'data-video-id')
    .then(id => {
      videoId = id;
    });
  cy.get(SELECTOR.SEARCH_OUTER_CONTAINER).click({ force: true });
  cy.get(SELECTOR.WATCH_LATER_NAV_BUTTON).click();
  if (isWatched) {
    cy.get(SELECTOR.VIDEO_WATCH_BUTTON).first().click();
    cy.get(SELECTOR.WATCHED_NAV_BUTTON).click();
  }
  cy.get(selector)
    .first()
    .invoke('attr', 'data-video-id')
    .then(id => {
      expect(id).to.eq(videoId);
    });
});
