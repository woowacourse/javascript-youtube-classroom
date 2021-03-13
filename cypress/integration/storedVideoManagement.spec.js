import { YOUTUBE_API, MESSAGE } from '../../src/js/constants';

describe('저장된 비디오 관리 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  const KEYWORD = '테코톡';

  it('저장된 영상이 없는 경우, 비어있다는 것을 사용자에게 알려주는 상태를 표시한다.', () => {
    cy.get('.js-no-video-found').should('have.class', 'no-watching');
  });

  it('저장된 영상이 있는 경우에 페이지를 다시 방문하면, 시청중인 영상 목록을 표시한다.', () => {
    const savedVideoTitles = [];

    cy.get('.js-search-menu-button').click();
    cy.get('.js-search-keyword-input').type(KEYWORD);
    cy.get('.js-search-keyword-form').submit();
    cy.wait(2000);

    cy.get('.js-save-button').each(($el) => {
      $el.click();
      cy.wrap($el)
        .parent()
        .siblings('.js-video-title')
        .invoke('text')
        .then((videoTitle) => savedVideoTitles.push(`${videoTitle}`));
    });

    cy.reload();
    cy.get('.js-saved-videos-wrapper .js-video-title').each(($el, index) => {
      cy.wrap($el)
        .invoke('text')
        .then((title) => expect(title.replace(/&/g, '&amp;')).to.be.eq(savedVideoTitles[index]));
    });
  });

  it('[시청 중인 영상] 메뉴에서 영상 카드의 시청완료 체크버튼을 클릭하면, 해당 영상이 시청중인 영상에서 시청완료 영상으로 옮겨지고 알림이 표시된다.', () => {
    cy.get('.js-search-menu-button').click();
    cy.get('.js-search-keyword-input').type(KEYWORD);
    cy.get('.js-search-keyword-form').submit();
    cy.wait(2000);
    cy.get('.js-save-button').each(($el) => $el.click());
    cy.get('.js-modal-close-button').click();

    cy.get('.js-check-button').each(($el, index) => {
      if (index > YOUTUBE_API.MAX_RESULT_COUNT / 2) {
        return;
      }
      cy.wrap($el).click();

      cy.get('.js-snackbar').contains(MESSAGE.VIDEO_IS_MOVED_TO_WATCHED_MENU);
      cy.wrap($el).closest('article').should('not.be.visible');
      cy.get('.js-watched-menu-button').click();
      cy.wrap($el).closest('article').should('be.visible');
      cy.get('.js-watching-menu-button').click();
    });
  });

  it('[시청 완료 영상] 메뉴에서 영상 카드의 시청완료 체크버튼을 해제하면, 해당 영상이 시청완료 영상에서 시청중인 영상으로 옮겨지고 알림이 표시된다.', () => {
    cy.get('.js-search-menu-button').click();
    cy.get('.js-search-keyword-input').type(KEYWORD);
    cy.get('.js-search-keyword-form').submit();
    cy.wait(2000);
    cy.get('.js-save-button').each(($el) => $el.click());
    cy.get('.js-modal-close-button').click();
    cy.get('.js-check-button').each(($el, index) => {
      if (index > YOUTUBE_API.MAX_RESULT_COUNT / 2) {
        return;
      }
      cy.wrap($el).click();
    });
    cy.get('.js-watched-menu-button').click();

    cy.get('.js-check-button.checked').each(($el) => {
      cy.wrap($el).click();

      cy.get('.js-snackbar').contains(MESSAGE.VIDEO_IS_MOVED_TO_WATCHING_MENU);
      cy.wrap($el).closest('article').should('not.be.visible');
      cy.get('.js-watching-menu-button').click();
      cy.wrap($el).closest('article').should('be.visible');
      cy.get('.js-watched-menu-button').click();
    });
  });

  it('영상 카드의 삭제버튼을 클릭하면, 나의 강의실에서 해당 영상이 삭제되고 알림이 표시된다.', () => {
    cy.get('.js-search-menu-button').click();
    cy.get('.js-search-keyword-input').type(KEYWORD);
    cy.get('.js-search-keyword-form').submit();
    cy.wait(2000);
    cy.get('.js-save-button').eq(0).click();
    cy.get('.js-modal-close-button').click();

    cy.get('.js-remove-button').click();
    cy.get('.js-snackbar').contains(MESSAGE.VIDEO_IS_REMOVED_SUCCESSFULLY);
    cy.get('.js-saved-videos-wrapper article').should('not.exist');
  });

  it('[시청 중인 영상]과 [시청 완료 영상] 메뉴버튼을 클릭하여 저장한 영상을 필터링할 수 있다.', () => {
    cy.get('.js-search-menu-button').click();
    cy.get('.js-search-keyword-input').type(KEYWORD);
    cy.get('.js-search-keyword-form').submit();
    cy.wait(2000);
    cy.get('.js-save-button').each(($el) => $el.click());
    cy.get('.js-modal-close-button').click();
    cy.get('.js-check-button').each(($el, index) => {
      if (index > YOUTUBE_API.MAX_RESULT_COUNT / 2) {
        return;
      }
      cy.wrap($el).click();
    });

    cy.get('.js-saved-videos-wrapper .watching').each(($el) => cy.wrap($el).should('be.visible'));
    cy.get('.js-saved-videos-wrapper .watched').each(($el) => cy.wrap($el).should('not.be.visible'));

    cy.get('.js-watched-menu-button').click();
    cy.get('.js-saved-videos-wrapper .watched').each(($el) => cy.wrap($el).should('be.visible'));
    cy.get('.js-saved-videos-wrapper .watching').each(($el) => cy.wrap($el).should('not.be.visible'));
  });
});
