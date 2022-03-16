describe('사용자는 검색을 통해 영상을 확인할 수 있다.', () => {
  const baseURL = '../../dist/index.html';
  beforeEach(() => {
    cy.visit(baseURL);
  });
  it('모달 버튼을 클릭하면, 검색 모달 창이 보인다.', () => {
    cy.showModal();
    cy.get('.modal-container').should('exist');
  });
  it('모달 버튼을 클릭 후, 검색어를 입력하면 결과를 확인할 수 있다.', () => {
    const keyword = '이하이';
    cy.showModal();

    cy.get('#search-input-keyword').type(keyword);

    cy.get('#search-button')
      .click()
      .then(() => {
        cy.get('.video-item').should('exist');
      });
  });
  it('빈 검색어를 입력하면 경고창을 확인하게 된다.', () => {});
  it('스크롤을 내리면 다음 영상들을 확인할 수 있다.', () => {});
});
