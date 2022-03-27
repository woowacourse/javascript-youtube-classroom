const ENTRY = 'http://localhost:9000';
const SELECTOR = {
  SEARCH_MODAL_BUTTON: '#search-modal-button',
  SEARHCH_INPUT_KEYWORD: '#search-input-keyword',
  SEARCH_BUTTON: '#search-button',
  SAVE_BUTTON: '.video-item__save-button',
  MODAL_CONTAINER: '.modal-container',
  SAVED_VIDEO_ITEM: '.saved-video-item',
};
const KEYWORD = '우테코';

describe('유투브 검색 및 저장 테스트', () => {
  before(() => {
    cy.visit(ENTRY);
    cy.viewport(1536, 960);
  });

  it('검색을 한 후 영상을 저장할 수 있다', () => {
    cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();

    cy.get(SELECTOR.SEARHCH_INPUT_KEYWORD).type(KEYWORD);
    cy.get(SELECTOR.SEARCH_BUTTON).click();
    cy.wait(5000);

    cy.get(SELECTOR.SAVE_BUTTON).first().click();
    cy.get(SELECTOR.MODAL_CONTAINER).click('top');

    cy.get(SELECTOR.SAVED_VIDEO_ITEM).should('exist');
  });
});
