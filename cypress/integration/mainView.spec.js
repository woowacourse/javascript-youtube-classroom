import '../support/commands.js';

describe('영상 리스트를 확인합니다.', () => {
  before(() => {
    cy.visit('../../dist/index.html');
  });

  it('저장된 영상이 없다면 비어있음을 나타내는 이미지를 보여줍니다.', () => {
    cy.get('.empty-list-image').should('be.visible');
  });

  it('저장된 영상이 있다면 영상을 보여줍니다.', () => {
    cy.search('우테코');
    cy.save(0);
    cy.get('.dimmer').click({ force: true });
    cy.get('.video-item').should('be.visible');
  });

  it('저장된 영상을 삭제할 수 있습니다.', () => {
    cy.get('.delete-button').click();
    cy.on('window:confirm', () => true);
    cy.get('.empty-list-image').should('be.visible');
  });
});
