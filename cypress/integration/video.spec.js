it('초기화면에서는 저장된 영상을 확인할 수 없다.', () => {
  cy.visit('http://localhost:9000/');
  cy.get('#will-see-list').children().should('have.length', 0);
});

describe('영상을 관리할 수 있다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type('위니');
    cy.get('#search-button').click();
    cy.wait(3000);
    cy.get('.video-item__save-button').first().click();
    cy.get('.close-button').click({force: true});
  });

  it('동영상 검색 및, 영상을 저장하고 모달 창을 닫았을 때, 볼 영상 목록의 길이가 1이다.', () => {
    cy.get('#will-see-list').children().should('have.length', 1);
  });

  it('볼영상 탭에서 체크 버튼을 클릭하면, 해당 영상은 본영상 탭으로 이동한다.', () => {
    cy.get('.user-saw-button').click();
    cy.get('#will-see-list').children().should('have.length', 0);
    cy.get('#saw-list').children().should('have.length', 1);
  });

  it('본영상 탭에서 체크 버튼을 클릭하면, 해당 영상은 볼영상 탭으로 이동한다.', () => {
    cy.get('.user-saw-button').click();
    cy.get('#saw-button').click();
    cy.get('.user-saw-button').click();
    cy.get('#saw-list').children().should('have.length', 0);
    cy.get('#will-see-list').children().should('have.length', 1);
  });

  it('삭제 버튼을 클릭하면, 해당 영상은 삭제된다.', () => {
    cy.get('.user-delete-button').click();
    cy.get('#will-see-list').children().should('have.length', 0);
  });
});