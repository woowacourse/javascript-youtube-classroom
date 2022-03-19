import { SELECTOR } from '../support/constants.js';
describe('사용자의 모션에 따라 나만의 유튜브 강의실이 작동하는지 테스트 한다', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('페이지에 최초로 접근하였을 때에 보여지는 콘텐츠는 볼 영상이다', () => {
    cy.get(SELECTOR.WATCH_LATER_VIDEOS).should('not.have.class', 'hidden');
    cy.get(SELECTOR.WATCHED_VIDEOS).should('have.class', 'hidden');
  });

  it('본 영상 nav버튼을 클릭하면 본 영상 콘텐츠가 보여진다', () => {
    cy.get(SELECTOR.WATCHED_NAV_BUTTON).click();
    cy.get(SELECTOR.WATCHED_VIDEOS).should('not.have.class', 'hidden');
    cy.get(SELECTOR.WATCH_LATER_VIDEOS).should('have.class', 'hidden');
  });

  it('볼 영상 nav버튼을 클릭하면 볼 영상 콘텐츠가 보여진다', () => {
    cy.get(SELECTOR.WATCH_LATER_NAV_BUTTON).click();
    cy.get(SELECTOR.WATCHED_VIDEOS).should('have.class', 'hidden');
    cy.get(SELECTOR.WATCH_LATER_VIDEOS).should('not.have.class', 'hidden');
  });

  it('검색하기 버튼을 누르면 검색 모달 창이 보여진다', () => {
    cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();
    cy.get(SELECTOR.SEARCH_MODAL_CONTAINER).should('not.have.class', 'hide');
  });

  it('검색 모달창이 띄워 진 후 dimmer을 누르면 모달 창이 꺼진다', () => {
    cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();
    cy.get(SELECTOR.SEARCH_OUTER_CONTAINER).click({ force: true });
    cy.get(SELECTOR.SEARCH_MODAL_CONTAINER).should('have.class', 'hide');
  });

  it('로컬 스토리지에 저장된 값이 없다면, 비어있다는 이미지가 표기된다', () => {
    cy.clearLocalStorage();
    cy.get(SELECTOR.WATCHED_NAV_BUTTON).click();
    cy.get(SELECTOR.EMPTY_IMG_CONTAINER).should('be.visible');
    cy.get(SELECTOR.WATCH_LATER_NAV_BUTTON).click();
    cy.get(SELECTOR.EMPTY_IMG_CONTAINER).should('be.visible');
  });

  it('검색 후 동영상 저장 버튼을 누르면, 해당 동영상의 저장 버튼이 사라진다', () => {
    cy.searchSaveEvent('우테코');
  });

  it('동영상 저장 버튼을 누른 동영상을 볼 영상 화면에서 확인 할 수 있다', () => {
    const videoId = cy.checkVideoId(SELECTOR.WATCH_LATER_VIDEOS_ITEMS, false);
  });

  it('볼 영상 화면에서 동영상 저장 버튼을 누르면 볼 영상에서 사라지고 본 영상에서 나타난다', () => {
    cy.checkVideoId(SELECTOR.WATCHED_VIDEOS_ITEMS, true);
  });

  it('본 영상에서 존재하는 하는 동영상을 삭제할 경우 사용자의 확인을 거치고 삭제한다', () => {
    cy.searchSaveEvent('우테코');
    cy.get(SELECTOR.SEARCH_OUTER_CONTAINER).click({ force: true });
    cy.get(SELECTOR.WATCH_LATER_NAV_BUTTON).click();
    cy.get(SELECTOR.VIDEO_DELETE_BUTTON).first().click();
    cy.on('window:confirm', () => {
      return true;
    });
    cy.get(SELECTOR.EMPTY_IMG_CONTAINER).should('be.visible');
  });
});
