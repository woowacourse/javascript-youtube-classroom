import { SELECTOR_ID, SELECTOR_CLASS } from '../../src/constants.js';

context('유튜브 강의실 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
  });
  describe('검색', () => {
    it('검색 모달에서 검색어를 바탕으로 영상을 검색하여 그 결과를 보여준다.', () => {
      cy.get(`#${SELECTOR_ID.SEARCH_BUTTON}`).click();
      cy.get(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`).type('우아한');
      const now = new Date().getTime();
      cy.clock(now);
      cy.get(`#${SELECTOR_ID.SEARCH_FORM_SUBMIT}`).click();
      cy.tick(2000);
      cy.get(`#${SELECTOR_ID.VIDEO_WRAPPER} .${SELECTOR_CLASS.CLIP}`)
        .its('length')
        .should('be.gt', 0);
    });
  });
});
