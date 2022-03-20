function createConfirmStub(bool) {
  const stub = cy.stub().returns(bool);

  cy.on('window:confirm', stub);

  return stub;
}

describe('e2e test', () => {
  before(() => {
    cy.visit('index.html');
    cy.intercept('GET', 'https://trusting-mcnulty-63c936.netlify.app/**').as(
      'get'
    );
  });

  it('모달창을 열고 검색을 하면 10개의 영상이 보여야 한다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type('TDD');
    cy.get('#search-button').click();
    cy.wait('@get');
    cy.get('.video-card').should('have.length', 10);
  });

  it('영상을 저장하면 저장한 영상이 보여야 한다.', () => {
    cy.get('.video-item__save-button').first().click();
    cy.get('#modal-background').click({ force: true });
    cy.get('saved-list').find('.video-card').should('have.length', 1);
  });

  it('본 영상 버튼을 클릭하면 본 영상 필터를 클릭했을 때 영상이 보여야 한다.', () => {
    cy.get('saved-list').find('.video-item__watched-button').first().click();
    cy.get('saved-list').find('.video-card').should('have.length', 0);
    cy.get('#filter-watched-button').click();
    cy.get('saved-list').find('.video-card').should('have.length', 1);
  });

  it('삭제 버튼을 클릭하면 사용자에게 삭제할 것인지 물어야 한다.', () => {
    const confirmStub = createConfirmStub(false);

    cy.get('saved-list')
      .find('.video-item__remove-button')
      .first()
      .click()
      .then(() => {
        expect(confirmStub).to.be.called;
      });
  });

  it('사용자가 삭제를 confirm하면 저장된 영상에서 지워져야 한다.', () => {
    cy.get('saved-list')
      .find('.video-item__remove-button')
      .first()
      .click()
      .then(() => {
        cy.on('window:confirm', () => true);
        cy.get('saved-list').find('.video-card').should('have.length', 0);
      });
  });
});
