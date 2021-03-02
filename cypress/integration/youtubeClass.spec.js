import { ID_SELECTOR, CLASS_SELECTOR } from '../../src/constants.js';

context('유튜브 강의실 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
  });
  describe('검색', () => {
    it('검색 모달에서 검색어를 바탕으로 영상을 검색하여 그 결과를 보여준다.', () => {
      cy.get(`#${ID_SELECTOR.SEARCH_BUTTON}`).click();
      cy.get(`#${ID_SELECTOR.SEARCH_FORM_INPUT}`).type('우아한');
      cy.get(`#${ID_SELECTOR.SEARCH_FORM_SUBMIT}`).click();
      cy.get(`#${ID_SELECTOR.VIDEO_WRAPPER} .${CLASS_SELECTOR.CLIP}`).its('length').should('be.gt', 0);
    })
  });
});