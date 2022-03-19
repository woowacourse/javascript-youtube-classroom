describe('구현 결과가 요구사항과 일치해야 한다.', () => {
  const baseUrl = './index.html';

  before(() => {
    cy.visit(baseUrl);
  });

  it('검색어를 검색 후, 영상을 저장 한 뒤, 초기화면으로 이동하면 초기화면에 해당 영상이 보여줘야 한다.', () => {
    // 검색어 검색
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type('호랑이');
    cy.get('#search-button').click();

    cy.intercept(
      'https://competent-haibt-c82cf4.netlify.app/dummy/youtube/v3/search?*',
    ).as('search');

    // 저장 버튼 클릭
    cy.get('.video-item').should('be.visible');
    cy.get('.video-list > li:first > .video-item__save-button').click();

    // 초기화면 이동
    cy.get('.dimmer').click(0, 0, { force: true });
    cy.get('.stored-result > .video-list > li:first').should('be.visible');
  });
});
