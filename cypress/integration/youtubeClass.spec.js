import { SELECTOR_ID, SELECTOR_CLASS, SETTINGS } from '../../src/constants.js';

const waitTime = 2000;

context('유튜브 강의실 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
    cy.window()
      .then(win => cy.stub(win, 'confirm'))
      .as('confirmStub');
  });
  describe('볼 영상', () => {
    it('🗑️ 버튼으로 저장된 리스트에서 삭제할 수 있다.', () => {
      click(`#${SELECTOR_ID.SEARCH_BUTTON}`);
      type(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`, '우아한');
      click(`#${SELECTOR_ID.SEARCH_FORM_SUBMIT}`);
      cy.wait(waitTime);
      cy.get(`.${SELECTOR_CLASS.SEARCHED_CLIP_SAVE_BUTTON}`).then(elements => {
        click(elements[0]);
      });
      click(`#${SELECTOR_ID.MODAL_CLOSE_BUTTON}`);
      click(`.${SELECTOR_CLASS.CLIP_DELETE_BUTTON}`);
      cy.on('window:confirm', () => true);
      cy.on('window:confirm', str => {
        expect(str).to.equal(ALERT_MESSAGE.CLIP_DELETE_CONFIRM);
      });
      cy.get(`.${SELECTOR_CLASS.CLIP}`).should('not.exist');
    });

    it('✅ 버튼을 누르면 본 영상으로 체크된다.', () => {
      click(`#${SELECTOR_ID.SEARCH_BUTTON}`);
      type(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`, '우아한');
      click(`#${SELECTOR_ID.SEARCH_FORM_SUBMIT}`);
      cy.wait(waitTime);
      cy.get(`.${SELECTOR_CLASS.SEARCHED_CLIP_SAVE_BUTTON}`).then(elements => {
        click(elements[0]);
      });
      click(`#${SELECTOR_ID.MODAL_CLOSE_BUTTON}`);
      click(`.${SELECTOR_CLASS.CLIP_CHECK_BUTTON}`);
      cy.get(`.${SELECTOR_CLASS.CLIP}`).should('not.exist');
    });

    it('볼 영상에 저장된 영상이 없으면 이를 알려준다.', () => {
      cy.clearLocalStorage();
      cy.reload();
      cy.get(`.${SELECTOR_CLASS.CLIP}`).should('not.exist');
      cy.get(`#${SELECTOR_ID.EMPTY_VIDEO_TO_WATCH}`).should('be.visible');
    });
  });
  describe('검색어', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.reload();
    });

    it('최근 검색한 3가지 검색 키워드를 볼 수 있다.', () => {
      click(`#${SELECTOR_ID.SEARCH_BUTTON}`);
      type(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`, '우아한1');
      click(`#${SELECTOR_ID.SEARCH_FORM_SUBMIT}`);
      clearInput(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`);

      type(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`, '우아한2');
      click(`#${SELECTOR_ID.SEARCH_FORM_SUBMIT}`);
      clearInput(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`);

      type(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`, '우아한3');
      click(`#${SELECTOR_ID.SEARCH_FORM_SUBMIT}`);
      clearInput(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`);

      type(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`, '우아한4');
      click(`#${SELECTOR_ID.SEARCH_FORM_SUBMIT}`);
      clearInput(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`);

      cy.get(`.${SELECTOR_CLASS.SEARCH_QUERIES_CHIP}`)
        .its('length')
        .should('be.equal', SETTINGS.MAX_SAVED_SEARCH_QUERY_COUNT);
    });
  });
  describe('검색 모달', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.reload();
    });

    it('검색한 영상들 중 특정 영상 데이터를 저장 버튼을 눌러 저장할 수 있다.', () => {
      click(`#${SELECTOR_ID.SEARCH_BUTTON}`);
      type(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`, '우아한');
      click(`#${SELECTOR_ID.SEARCH_FORM_SUBMIT}`);
      cy.wait(waitTime);
      cy.get(`.${SELECTOR_CLASS.SEARCHED_CLIP_SAVE_BUTTON}`).then(elements => {
        click(elements[0]);
      });
      click(`#${SELECTOR_ID.MODAL_CLOSE_BUTTON}`);
      cy.get(`#${SELECTOR_ID.VIDEO_WRAPPER} .${SELECTOR_CLASS.SEARCHED_CLIP}`)
        .its('length')
        .should('be.gt', 0);
    });

    it('최초 검색결과는 10개까지만 보여준다. 더 많은 데이터는 스크롤을 내릴 때 추가로 불러온다.', () => {
      click(`#${SELECTOR_ID.SEARCH_BUTTON}`);
      type(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`, '우아한');
      click(`#${SELECTOR_ID.SEARCH_FORM_SUBMIT}`);
      cy.wait(waitTime);
      cy.get(`.${SELECTOR_CLASS.SEARCHED_CLIP}`).last().scrollIntoView();
      cy.wait(waitTime);
      cy.get(
        `#${SELECTOR_ID.SEARCH_RESULT_VIDEO_WRAPPER} .${SELECTOR_CLASS.SEARCHED_CLIP}`
      )
        .its('length')
        .should('be.gt', 10);
    });

    it('검색 결과가 없는 경우 결과 없음 이미지를 추가하여, 사용자에게 메시지를 보여준다.', () => {
      click(`#${SELECTOR_ID.SEARCH_BUTTON}`);
      type(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`, 'dsvkasdvklasdlkdv');
      click(`#${SELECTOR_ID.SEARCH_FORM_SUBMIT}`);
      cy.wait(waitTime);
      cy.get(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`).should('be.visible');
    });

    it('검색 모달에 다시 접근했을 때 이전의 검색 결과를 보여준다.', () => {
      click(`#${SELECTOR_ID.SEARCH_BUTTON}`);
      type(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`, '우아한');
      click(`#${SELECTOR_ID.SEARCH_FORM_SUBMIT}`);
      cy.wait(waitTime);
      cy.reload();
      click(`#${SELECTOR_ID.SEARCH_BUTTON}`);
      cy.get(
        `#${SELECTOR_ID.SEARCH_RESULT_VIDEO_WRAPPER} .${SELECTOR_CLASS.SEARCHED_CLIP}`
      )
        .its('length')
        .should('be.gt', 0);
    });

    it('검색 모달에서 검색어를 바탕으로 영상을 검색하여 그 결과를 보여준다.', () => {
      click(`#${SELECTOR_ID.SEARCH_BUTTON}`);
      type(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`, '우아한');
      const now = new Date().getTime();
      click(`#${SELECTOR_ID.SEARCH_FORM_SUBMIT}`);
      cy.wait(waitTime);
      cy.get(
        `#${SELECTOR_ID.SEARCH_RESULT_VIDEO_WRAPPER} .${SELECTOR_CLASS.SEARCHED_CLIP}`
      )
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

function clearInput(selector) {
  return cy.get(selector).clear();
}
