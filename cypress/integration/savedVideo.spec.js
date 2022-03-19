describe('유튜브 강의실 저장된 영상 테스트', () => {
  beforeEach(() => {
    cy.visit('index.html');
    cy.saveVideo();
  });

  it('영상을 검색한 후 저장버튼을 눌러 저장할 수 있어야한다.', () => {
    cy.get('#playlist-video').children().should('be.visible');
  });

  it('저장한 영상은 ✅버튼을 이용해 상태를 변한할 수 있어야한다.', () => {
    cy.get('.check-watched-button').first().click();
    cy.get('#playlist-video').should('have.class', 'empty-savedList');
    cy.get('#display-watched-section').check({ force: true });
    cy.get('#watched').children().should('be.visible');

    cy.get('.check-watched-button').first().click();
    cy.get('#watched-video').should('have.class', 'empty-savedList');
    cy.get('#display-playlist-section').check({ force: true });
    cy.get('#playlist-video').children().should('be.visible');
  });

  it('저장한 영상은 🗑️버튼을 이용해 지울 수 있어야 한다.', () => {
    cy.get('.delete-button').first().click();
    cy.get('#playlist-video').should('have.class', 'empty-savedList');
  });
});
