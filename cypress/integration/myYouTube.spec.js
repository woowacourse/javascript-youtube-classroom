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

  it('검색 모달 창의 x 버튼을 누르면 검색 모달 창이 닫히고, 볼 영상 목록으로 돌아간다.', () => {
    cy.get('#search-btn').click();
    cy.get('.modal-close').click();
    cy.get('.modal').should('not.be.visible');
    cy.get('#saved-btn').should(
      'have.css',
      'background-color',
      'rgb(179, 234, 242)',
    );
  });

  it('현재 검색한 검색어가 최근 검색어 목록에 남는다.', () => {
    cy.get('#search-btn').click();
    cy.get('#modal-search-input').type('불닭');
    cy.get('#modal-search-button').click();
    cy.get('.chip').eq(0).should('have.text', '불닭');
  });
});
