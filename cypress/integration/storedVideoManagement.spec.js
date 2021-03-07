import { VIDEOS_TO_WATCH, VIDEOS_WATCHED } from '../../src/js/constants';

describe('저장된 비디오 관리 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('저장된 영상이 없는 경우, 비어있다는 것을 사용자에게 알려주는 상태를 보여준다.', () => {
    cy.clearLocalStorage(VIDEOS_TO_WATCH);
    cy.clearLocalStorage(VIDEOS_WATCHED);
    cy.get('.js-stored-videos').find('img').should('have.attr', 'src').should('include', 'no_video_stored');
  });
});
