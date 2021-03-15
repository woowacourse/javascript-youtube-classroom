import { ALERT_MESSAGE, SELECTORS } from '../../src/js/constants.js';

describe('나만의 유튜브 강의실 Test', () => {
  before(() => {
    cy.visit('http://localhost:5500/');
  });

  it('동영상 검색 버튼을 눌렀을 때, 유튜브 검색 modal이 나타난다.', () => {
    cy.get(SELECTORS.ID.SEARCH_BUTTON).click();
    cy.get(SELECTORS.CLASS.MODAL).should('be.visible');
  });

  it('동영상을 검색하면 검색 결과가 보여지고, 스크롤했을 때 추가 검색 결과가 보여진다. (검색어는 최근 검색어에 저장된다)', () => {
    const keyword = '무야호';

    // 유튜브 검색 modal에서 검색어를 입력하고 검색 버튼을 누르면, 검색 결과를 10개까지 보여준다.
    cy.get(SELECTORS.ID.YOUTUBE_SEARCH_KEYWORD_INPUT).type(keyword);
    cy.get(SELECTORS.ID.YOUTUBE_SEARCH_FORM).submit();
    cy.wait(5000);
    cy.get(`${SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT} ${SELECTORS.CLASS.CLIP}`).then(($$clips) => {
      cy.wrap($$clips).should('have.length', 10);
      // 유튜브 검색 modal에서 검색 결과 스크롤 바를 끝까지 이동시켰을 경우, 그 다음 10개의 검색 결과를 추가로 보여준다.
      cy.get(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT_CONTAINER).scrollTo('bottom');
      cy.wait(5000);
      cy.get(`${SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT} ${SELECTORS.CLASS.CLIP}`).should('have.length', 20);
    });

    // 검색한 검색어는 최근 검색어에 추가된다.
    cy.get('.chip').first().should('have.text', keyword);
  });

  it('각 검색 결과 동영상의 저장 버튼을 누르면 볼 영상 목록의 마지막에 저장한 동영상이 추가된다.', () => {
    cy.get(`${SELECTORS.CLASS.MODAL} ${SELECTORS.CLASS.BTN_SAVE}`).first().click();
    cy.get(`${SELECTORS.CLASS.MODAL} ${SELECTORS.CLASS.BTN_SAVE}`).eq(1).click();

    cy.get(`${SELECTORS.CLASS.MODAL} ${SELECTORS.CLASS.VIDEO_TITLE}`)
      .first()
      .then(($title) => {
        const title = $title.text();
        cy.get(`main ${SELECTORS.CLASS.VIDEO_TITLE}`).last().should('have.text', title);
      });
  });

  it('modal이 나타난 상태에서, dimmer나 닫기 버튼을 누르면, modal이 사라진다.', () => {
    cy.get(SELECTORS.CLASS.MODAL_CLOSE).click();
    cy.get(SELECTORS.CLASS.MODAL).should('be.not.visible');

    cy.get(SELECTORS.ID.SEARCH_BUTTON).click();
    cy.get(SELECTORS.CLASS.MODAL).click('topLeft');
    cy.get(SELECTORS.CLASS.MODAL).should('be.not.visible');
  });

  it('🗑️ 버튼으로 저장된 리스트에서 삭제할 수 있다. (삭제 시 사용자에게 정말 삭제할 것인지 물어봅니다.)', () => {
    cy.get(SELECTORS.CLASS.CLIP).then(($$clips) => {
      const $firstClip = $$clips[0];

      cy.wrap($firstClip).find(SELECTORS.CLASS.DELETE).click();
      cy.on('window:confirm', (str) => {
        expect(str).to.equal(ALERT_MESSAGE.CONFIRM_DELETE);
      });
      cy.on('window:confirm', () => true);
      cy.get(SELECTORS.ID.SNACKBAR).should('be.visible').should('have.text', ALERT_MESSAGE.VIDEO_DELETED);
      cy.wrap($firstClip).should('not.exist');
    });
  });

  it('특정 영상의 ✅ 버튼을 누르면 그 영상이 본 영상 목록에 옮겨지고, ✅ 버튼이 불투명해진다.', () => {
    // 해당 영상은 볼 영상 목록에서 사라진다.
    // 스낵바로 영상이 옮겨졌음을 알려주는 메시지가 출력된다.
    cy.get(SELECTORS.CLASS.WATCHED).first().click();
    cy.get(SELECTORS.ID.SNACKBAR).should('be.visible').should('have.text', ALERT_MESSAGE.VIDEO_MOVED_WATCHED_LIST);
    cy.get(SELECTORS.CLASS.WATCH_LIST).children().should('have.length', 0);
    cy.get(SELECTORS.CLASS.WATCHED_LIST_BUTTON).click();
    cy.get(SELECTORS.CLASS.WATCHED).then(($$watchedButtons) => {
      [...$$watchedButtons].forEach(($watchedButton) => {
        cy.wrap($watchedButton).should('have.css', 'opacity', '1');
      });
    });
  });

  it('동일한 영상의 ✅ 버튼을 누르면 그 영상이 볼 영상 목록으로 다시 옮겨지고, ✅ 버튼이 투명해진다.', () => {
    // 해당 영상은 본 영상 목록에서 사라진다.
    // 스낵바로 영상이 옮겨졌음을 알려주는 메시지가 출력된다.
    cy.get(SELECTORS.CLASS.WATCHED).first().click();
    cy.get(SELECTORS.ID.SNACKBAR).should('be.visible').should('have.text', ALERT_MESSAGE.VIDEO_MOVED_TO_WATCH_LIST);
    cy.get(SELECTORS.CLASS.WATCH_LIST).children().should('have.length', 0);
    cy.get(SELECTORS.CLASS.TO_WATCH_LIST_BUTTON).click();
    cy.get(SELECTORS.CLASS.WATCHED).then(($$watchedButtons) => {
      [...$$watchedButtons].forEach(($watchedButton) => {
        cy.wrap($watchedButton).should('have.css', 'opacity', '0.3');
      });
    });
  });

  it('이전에 저장해뒀던 비디오가 없으면, 저장한 동영상이 없다는 것을 알려주는 이미지를 출력한다.', () => {
    cy.get(SELECTORS.CLASS.CLIP).find(SELECTORS.CLASS.DELETE).click();

    cy.get(SELECTORS.CLASS.WATCH_LIST).then(($watchList) => {
      if ($watchList.find(SELECTORS.CLASS.CLIP).length <= 0) {
        cy.get(SELECTORS.CLASS.NO_VIDEO).should('be.visible');
      }
    });

    cy.get(SELECTORS.CLASS.TO_WATCH_LIST_BUTTON).click();

    cy.get(SELECTORS.CLASS.WATCH_LIST).then(($watchList) => {
      if ($watchList.find(SELECTORS.CLASS.CLIP).length <= 0) {
        cy.get(SELECTORS.CLASS.NO_VIDEO).should('be.visible');
      }
    });
  });
});
