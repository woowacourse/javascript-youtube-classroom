describe('나만의 유튜브 강의실 메인 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('페이지 접속시 기본 메인화면이 "볼 영상"인지 테스트한다. ', () => {
    cy.get('.bg-cyan-100').should('have.text', '👁️ 볼 영상');
  });

  it('저장한 동영상이 없을 경우 "동영상 없음"을 표시하는 상태를 보여주는지 테스트한다.', () => {
    cy.clearLocalStorage('savedClips');
    cy.get('[data-js="saved-page__not-found"]').should('be.visible');
  });

  it('영상 카드의 ✅ 버튼 클릭시, 볼 영상의 상태가 본 영상으로 변경되는지 테스트한다.', () => {
    // 더미 동영상 데이터 삽입
    cy.reload(); // -> 새로고침
    cy.get('[data-js="saved-clip-button-container__check"]').click();
    cy.get('[data-js="navigator__watched-button"]').click();
    cy.get('[data-js="saved-page__clip"]').shoulde('be.visible');
  });

  it('영상 카드의 ✅ 버튼 클릭시, 본 영상의 상태가 볼 영상으로 변경되는지 테스트한다.', () => {
    // 더미 동영상 데이터 삽입
    cy.reload(); // -> 새로고침
    cy.get('[data-js="navigator__watched-button"]').click();
    cy.get('[data-js="saved-clip-button-container__check"]').click();
    cy.get('[data-js="navigator__unwatched-button"]').click();
    cy.get('[data-js="saved-page__clip"]').shoulde('be.visible');
  });

});
