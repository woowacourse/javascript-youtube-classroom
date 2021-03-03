describe('Youtube classroom test', () => {
  before(() => {
    cy.visit('http://127.0.0.1:5500');
  });

  it('유튜브 검색 모달에서, 검색을 하면 동영상 리스트를 불러온다.', () => {
    cy.get('#search-button').click();
    cy.get('#video-search-input').type('로이드');
    cy.get('#video-search-submit').click();
    cy.get('#video-search-result .video').should('have.length', 10);
  });
});
