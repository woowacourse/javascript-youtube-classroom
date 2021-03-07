import { VIDEOS_TO_WATCH, VIDEOS_WATCHED } from '../../src/js/constants';

describe('저장된 비디오 관리 기능 테스트', () => {
  beforeEach(() => {
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
    cy.get('.js-stored-videos h3').each(($el, index) => {
      cy.wrap($el).should('have.text', storedVideoTitles[index]);
    });
  });
});
