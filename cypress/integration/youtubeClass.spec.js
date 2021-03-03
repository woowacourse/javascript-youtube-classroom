import { SELECTOR_ID, SELECTOR_CLASS } from '../../src/constants.js';

context('유튜브 강의실 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
  });
  describe('검색', () => {
    it('검색 모달에서 검색어를 바탕으로 영상을 검색하여 그 결과를 보여준다.', () => {
      click(`#${SELECTOR_ID.SEARCH_BUTTON}`);
      type(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`, '우아한');
      const now = new Date().getTime();
      cy.clock(now);
      click(`#${SELECTOR_ID.SEARCH_FORM_SUBMIT}`);
      cy.tick(2000);
      cy.get(`#${SELECTOR_ID.VIDEO_WRAPPER} .${SELECTOR_CLASS.CLIP}`)
        .its('length')
        .should('be.gt', 0);
    });

    it('검색 모달에 다시 접근했을 때 이전의 검색 결과를 보여준다.', () => {
      click(`#${SELECTOR_ID.SEARCH_BUTTON}`);
      type(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`, '우아한');
      const now = new Date().getTime();
      cy.clock(now);
      click(`#${SELECTOR_ID.SEARCH_FORM_SUBMIT}`);
      cy.tick(2000);
      click(`#${SELECTOR_ID.MODAL_CLOSE_BUTTON}`);
      click(`#${SELECTOR_ID.SEARCH_BUTTON}`);
      cy.get(`#${SELECTOR_ID.VIDEO_WRAPPER} .${SELECTOR_CLASS.CLIP}`)
        .its('length')
        .should('be.gt', 0);
    });
  });
});

function click(selector) {
  return cy.get(selector).click();
}

function type(selector, value) {
  return cy.get(selector).type(value);
}
