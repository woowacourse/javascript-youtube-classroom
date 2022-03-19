it("2-1. 메인 화면의 '검색' 버튼을 누르면 검색 모달창이 표시된다.", () => {
  cy.visit('./index.html');

  cy.get('.nav-right__button').click();

  cy.get('.modal-container').should('be.visible');
});
