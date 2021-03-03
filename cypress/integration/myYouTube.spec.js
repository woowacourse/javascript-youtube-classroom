describe('simba-tube', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
    cy.window().then((win) => cy.stub(win, 'alert').as('windowAlert'));
  });

  it('클릭한 탭의 색을 하이라이트한다.', () => {
    cy.get('#nav-bar > button').each((button) => {
      cy.wrap(button).click();
      cy.wrap(button).should(
        'have.css',
        'background-color',
        'rgb(179, 234, 242)',
      );
    });
  });

  it('동영상 검색 버튼을 클릭하면 모달 창이 열린다.', () => {
    cy.get('#search-btn').click();
    cy.get('.modal').should('be.visible');
  });
});
