describe('모달 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('../../dist/index.html');
  });

  it('검색 버튼을 클릭하면 모달을 볼 수 있다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('.modal-container').should('be.visible');
  });

  it('모달 바깥 영역을 클릭하면 모달을 닫는다.', () => {
    cy.get('.dimmer').click({ force: true });
    cy.get('.modal-container').should('not.be.visible');
  });
});
