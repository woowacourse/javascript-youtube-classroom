describe('유튜브 강의실 영상 검색 테스트', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  it('🔍 검색 버튼을 눌렀을 때 모달이 띄워져야한다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-modal').should('be.visible');
  });

  it('바깥을 클릭하거나 esc를 누를 때 모달이 꺼져야한다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('#modal-background').click({ force: true });
    cy.get('#search-modal').should('not.be.visible');

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type('{esc}');
  });

  it('엔터키를 누르거나 검색 버튼을 누르면 검색 결과가 나와야한다.', () => {
    cy.searchVideo();
    cy.get('#videos').children('.video-item').should('be.visible');
    cy.get('#search-button').click();
    cy.get('#videos').children('.video-item').should('be.visible');
  });

  it('처음에 결과 영상을 10개만 보여준 후, 스크롤을 했을 때 10개를 추가적으로 더 보여준다.', () => {
    cy.searchVideo();
    cy.get('#videos').children('.video-item').should('have.length', 10);

    cy.get('#videos').scrollTo('bottom');
    cy.get('#videos').children('.video-item').should('have.length', 20);
  });
});
