import { YOUTUBE_API, MESSAGE, DB_KEY } from '../../src/js/constants';
import { getListByKey } from '../../src/js/utils/localStorage';
import { unescape } from '../../src/js/utils/unescapeSpecialCharacter.js';

describe('저장된 비디오 관리 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  const KEYWORD = '테코톡';

  it('저장된 영상이 없는 경우, 비어있다는 것을 사용자에게 알려주는 상태를 표시한다.', () => {
    cy.get('#no-video-found').should('have.class', 'no-watching');
  });

  it('저장된 영상이 있는 경우에 페이지를 다시 방문하면, 시청중인 영상 목록을 표시한다.', () => {
    const savedVideoTitles = [];

    cy.get('#search-menu-button').click();
    cy.get('#search-keyword-input').type(KEYWORD);
    cy.get('#search-keyword-form').submit();
    cy.wait(2000);

    cy.get('.save-button').each(($el) => {
      $el.click();
      cy.wrap($el)
        .parent()
        .siblings('.video-title')
        .invoke('text')
        .then((videoTitle) => savedVideoTitles.push(`${videoTitle}`));
    });

    cy.reload();
    cy.get('#saved-videos-wrapper .video-title').each(($el, index) => {
      cy.wrap($el)
        .invoke('text')
        .then((title) => expect(unescape(title)).to.be.eq(savedVideoTitles[index]));
    });
  });

  it('[시청 중인 영상] 메뉴에서 영상 카드의 시청완료 체크버튼을 클릭하면, 해당 영상이 시청중인 영상에서 시청완료 영상으로 옮겨지고 알림이 표시된다.', () => {
    cy.get('#search-menu-button').click();
    cy.get('#search-keyword-input').type(KEYWORD);
    cy.get('#search-keyword-form').submit();
    cy.wait(2000);
    cy.get('.save-button').each(($el) => $el.click());
    cy.get('#modal-close-button').click();

    cy.get('.check-button').each(($el, index) => {
      if (index > YOUTUBE_API.MAX_RESULT_COUNT / 2) {
        return;
      }
      cy.wrap($el).click();

      cy.get('.snackbar').contains(MESSAGE.VIDEO_IS_MOVED_TO_WATCHED_MENU);
      cy.wrap($el).closest('article').should('not.be.visible');
      cy.get('#watched-menu-button').click();
      cy.wrap($el).closest('article').should('be.visible');
      cy.get('#watching-menu-button').click();
    });
  });

  it('[시청 완료 영상] 메뉴에서 영상 카드의 시청완료 체크버튼을 해제하면, 해당 영상이 시청완료 영상에서 시청중인 영상으로 옮겨지고 알림이 표시된다.', () => {
    cy.get('#search-menu-button').click();
    cy.get('#search-keyword-input').type(KEYWORD);
    cy.get('#search-keyword-form').submit();
    cy.wait(2000);
    cy.get('.save-button').each(($el) => $el.click());
    cy.get('#modal-close-button').click();
    cy.get('.check-button').each(($el, index) => {
      if (index > YOUTUBE_API.MAX_RESULT_COUNT / 2) {
        return;
      }
      cy.wrap($el).click();
    });
    cy.get('#watched-menu-button').click();

    cy.get('.check-button.checked').each(($el) => {
      cy.wrap($el).click();

      cy.get('.snackbar').contains(MESSAGE.VIDEO_IS_MOVED_TO_WATCHING_MENU);
      cy.wrap($el).closest('article').should('not.be.visible');
      cy.get('#watching-menu-button').click();
      cy.wrap($el).closest('article').should('be.visible');
      cy.get('#watched-menu-button').click();
    });
  });

  it('영상 카드의 삭제버튼을 클릭하면, 나의 강의실에서 해당 영상이 삭제되고 알림이 표시된다.', () => {
    cy.get('#search-menu-button').click();
    cy.get('#search-keyword-input').type(KEYWORD);
    cy.get('#search-keyword-form').submit();
    cy.wait(2000);
    cy.get('.save-button').eq(0).click();
    cy.get('#modal-close-button').click();

    cy.get('.remove-button').click();
    cy.get('.snackbar').contains(MESSAGE.VIDEO_IS_REMOVED_SUCCESSFULLY);
    cy.get('#saved-videos-wrapper article').should('not.exist');
  });

  it('[시청 중인 영상]과 [시청 완료 영상] 메뉴버튼을 클릭하여 저장한 영상을 필터링할 수 있다.', () => {
    cy.get('#search-menu-button').click();
    cy.get('#search-keyword-input').type(KEYWORD);
    cy.get('#search-keyword-form').submit();
    cy.wait(2000);
    cy.get('.save-button').each(($el) => $el.click());
    cy.get('#modal-close-button').click();
    cy.get('.check-button').each(($el, index) => {
      if (index > YOUTUBE_API.MAX_RESULT_COUNT / 2) {
        return;
      }
      cy.wrap($el).click();
    });

    cy.get('#saved-videos-wrapper .watching').each(($el) => cy.wrap($el).should('be.visible'));
    cy.get('#saved-videos-wrapper .watched').each(($el) => cy.wrap($el).should('not.be.visible'));

    cy.get('#watched-menu-button').click();
    cy.get('#saved-videos-wrapper .watched').each(($el) => cy.wrap($el).should('be.visible'));
    cy.get('#saved-videos-wrapper .watching').each(($el) => cy.wrap($el).should('not.be.visible'));
  });

  it('좋아요 메뉴버튼을 누르면 좋아요 버튼을 누른 데이터만 보여준다.', () => {
    cy.get('#search-menu-button').click();
    cy.get('#search-keyword-input').type(KEYWORD);
    cy.get('#search-keyword-form').submit();
    cy.wait(2000);
    cy.get('.save-button').each(($el) => $el.click());
    cy.get('#modal-close-button').click();
    cy.get('.like-button').each(($el, index) => {
      if (index > YOUTUBE_API.MAX_RESULT_COUNT / 2) {
        return;
      }
      cy.wrap($el).click();
    });

    cy.get('#liked-menu-button').click();
    cy.get('#saved-videos-wrapper .liked').each(($el) => cy.wrap($el).should('be.visible'));
  });

  it('좋아요 메뉴버튼을 누르면 좋아요 로컬에서 데이터를 변경한다.', () => {
    const FIRST_INDEX = 0;
    cy.get('#search-menu-button').click();
    cy.get('#search-keyword-input').type(KEYWORD);
    cy.get('#search-keyword-form').submit();
    cy.wait(2000);
    cy.get('.save-button').eq(FIRST_INDEX).click();
    cy.get('#modal-close-button')
      .click()
      .then(() => {
        expect(false).to.be.eq(getListByKey(DB_KEY.VIDEOS)[FIRST_INDEX].isLiked);
      });
    cy.get('.like-button')
      .click()
      .then(() => {
        expect(true).to.be.eq(getListByKey(DB_KEY.VIDEOS)[FIRST_INDEX].isLiked);
      });
  });

  it('좋아요 버튼을 다시 클릭하면 좋아요가 해지된다.', () => {
    const FIRST_INDEX = 0;
    cy.get('#search-menu-button').click();
    cy.get('#search-keyword-input').type(KEYWORD);
    cy.get('#search-keyword-form').submit();
    cy.wait(2000);
    cy.get('.save-button').eq(FIRST_INDEX).click();
    cy.get('#modal-close-button').click();

    cy.get('.like-button').click();
    cy.get('#liked-menu-button').click();
    cy.get('.like-button').click();
    cy.get('#saved-videos-wrapper .liked').should('not.exist');
  });
});
