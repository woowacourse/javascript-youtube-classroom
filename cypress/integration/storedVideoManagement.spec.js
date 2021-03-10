import {
  VIDEOS_TO_WATCH,
  VIDEOS_WATCHED,
  VIDEO_IS_MOVED_TO_WATCHED_MENU,
  VIDEO_IS_MOVED_TO_WATCHING_MENU,
  VIDEO_IS_REMOVED,
  REQUEST_HAS_FAILED,
} from '../../src/js/constants';
import { $$ } from '../../src/js/utils/DOM';

describe('저장된 비디오 관리 기능 테스트', () => {
  before(() => {
    cy.visit('http://localhost:5500/');
  });

  it('저장된 영상이 없는 경우, 비어있다는 것을 사용자에게 알려주는 상태를 표시한다.', () => {
    cy.clearLocalStorage(VIDEOS_TO_WATCH);
    cy.clearLocalStorage(VIDEOS_WATCHED);
    cy.get('.js-stored-videos').find('img').should('have.attr', 'src').should('include', 'no_video_stored');
  });

  it('저장된 영상이 있는 경우에 페이지를 다시 방문하면, 시청중인 영상 목록을 표시한다.', () => {
    const KEYWORD = '테코톡';
    const storedVideoTitles = [];

    cy.get('#search-button').click();
    cy.get('#search-keyword-input').type(KEYWORD);
    cy.get('#search-keyword-form').submit();
    cy.get('.save-button').each(($el) => {
      $el.click();
      cy.wait(500);
      cy.wrap($el)
        .parent()
        .siblings('.video-title')
        .invoke('text')
        .then((videoTitle) => storedVideoTitles.push(videoTitle));
    });

    cy.reload();
    cy.get('.js-stored-videos .js-video-title').each(($el, index) => {
      cy.wrap($el).should('have.text', storedVideoTitles[index]);
    });
  });

  it('[시청 중인 영상] 메뉴에서 영상 카드의 시청완료 체크버튼을 클릭하면, 해당 영상이 시청중인 영상에서 시청완료 영상으로 옮겨진다.', () => {
    cy.get('.js-stored-videos .watching')
      .eq(0)
      .then(($el) => {
        cy.wrap($el).get('.js-check-button').click();

        cy.get('.js-snackbar').contains(VIDEO_IS_MOVED_TO_WATCHED_MENU);
        cy.wrap($el).should('have.class', 'watched');
        cy.wrap($el).should('not.be.visible');
        cy.get('.js-watched-menu-button').click();
        cy.wrap($el).should('be.visible');
      });
  });

  it('[시청 완료 영상] 메뉴에서 영상 카드의 시청완료 체크버튼을 해제하면, 해당 영상이 시청완료 영상에서 시청중인 영상으로 옮겨진다.', () => {
    cy.get('.js-stored-videos .watched')
      .eq(0)
      .then(($el) => {
        cy.wrap($el).get('.js-check-button').click();

        cy.get('.js-snackbar').contains(VIDEO_IS_MOVED_TO_WATCHING_MENU);
        cy.wrap($el).should('have.class', 'watching');
        cy.wrap($el).should('not.be.visible');
        cy.get('.js-watching-menu-button').click();
        cy.wrap($el).should('be.visible');
      });
  });
});
