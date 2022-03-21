import { SELECTOR } from '../src/js/constants/Selector.js';
import { ALERT_MESSAGE } from '../src/js/constants/String.js';

const testSetting = {
  targetVideoName: 'React 쇼핑몰 만들기 #1',
  targetVideoId: 'DkUbPhejy7A',
};

describe('기본 사용 순서 체크 (E2E)', () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.visit('/dist/index.html');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('검색 버튼을 클릭하여 검색 화면을 볼 수 있어야 한다.', () => {
    cy.get(SELECTOR.ID.SEARCH_MODAL_BUTTON).click();
    cy.get(SELECTOR.ID.MODAL_CONTAINER).should('be.visible');
  });

  it('검색어를 입력한 후 검색 버튼을 누를 시 검색 결과가 출력되어야 한다.', () => {
    cy.intercept('GET', 'https://www.googleapis.com/youtube/v3/search?*', {
      fixture: 'YoutubeSearchDummy.json',
    }).as('requestData');

    cy.get(SELECTOR.ID.SEARCH_INPUT_KEYWORD).type(testSetting.targetVideoName);
    cy.get(SELECTOR.ID.SEARCH_BUTTON).click();
    cy.wait('@requestData');

    cy.get(SELECTOR.ID.SEARCH_RESULT_CONTAINER).should('include.text', testSetting.targetVideoName);
  });

  it('출력된 검색 결과에서 저장 버튼을 누를 시 저장된 동영상 목록에 추가되어야 한다.', () => {
    cy.get(
      `${SELECTOR.CLASS.VIDEO_ITEM}[data-video-id="${testSetting.targetVideoId}"] ${SELECTOR.CLASS.VIDEO_ITEM_SAVE_BUTTON}`,
    ).click();

    cy.get(SELECTOR.ID.SAVE_LIST_CONTENT).should('include.text', testSetting.targetVideoName);
  });

  it('검색 모달의 바깥 영역을 눌러 검색 화면을 닫을 수 있어야 한다.', () => {
    cy.get(SELECTOR.CLASS.MODAL_DIMMER).click(10, 10, { force: true });
    cy.get(SELECTOR.ID.MODAL_CONTAINER).should('have.class', 'hide');
  });

  it('저장된 동영상 목록에 추가된 동영상을 시청 완료로 누를 시 상태가 변경되었음을 사용자에게 알려주어야 한다.', () => {
    cy.wait(2500);
    cy.get(SELECTOR.CLASS.SAVE_LIST_WATCHED_BUTTON).click();
    cy.get(SELECTOR.ID.SAVE_LIST_CONTENT).should('not.include.text', testSetting.targetVideoName);
    cy.get(SELECTOR.ID.SNACKBAR).should('include.text', ALERT_MESSAGE.SAVE_LIST_STATE_UPDATE);
  });

  it('메뉴의 본 영상 목록을 눌러 추가한 본 영상들을 확인할 수 있어야 한다.', () => {
    cy.get(`${SELECTOR.ID.NAVIGATION_FILTER_BUTTON} .button:last-child`).click();
    cy.get(SELECTOR.ID.SAVE_LIST_CONTENT).should('include.text', testSetting.targetVideoName);
  });

  it('저장된 동영상을 삭제할 수 있어야 한다.', () => {
    cy.get(SELECTOR.CLASS.SAVE_LIST_REMOVE_BUTTON).click();
    cy.get(SELECTOR.ID.SAVE_LIST_CONTENT).should('not.include.text', testSetting.targetVideoName);
  });
});
