describe('나만의 유튜브 강의실을 사용할 수 있다.', () => {
  before(() => {
    cy.visit('http://localhost:9000/');
  });

  it('저장된 영상이 없는 상태를 확인할 수 있어야 한다.', () => {
    cy.get('my-videos').find('label').should('be.visible');
  });

  it('영상을 검색하면 스켈레톤 UI를 확인할 수 있어야 한다.', () => {
    const keyword = '우테코';

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(keyword).type('{enter}');

    cy.get('.skeleton').should('be.visible');
  });

  it('영상을 검색하면 검색 결과를 확인할 수 있어야 한다.', () => {
    cy.clock();
    cy.tick(3000);
    cy.get('search-video-item').should('be.visible');
  });

  it('영상을 저장할 수 있어야 한다.', () => {
    const targetSaveButton = cy.get('.video-item__save-button').first();

    targetSaveButton.click();

    targetSaveButton.should('not.be.visible');
  });

  it('저장한 영상을 볼 영상 목록에서 확인할 수 있어야 한다.', () => {
    cy.get('.dimmer').click({ force: true });

    cy.get('.playlist-videos-container').find('.video-item').should('have.length', 1);
  });

  it('영상을 시청할 수 있어야 한다.', () => {
    cy.get('.playlist-videos-container')
      .find('.video-item')
      .first()
      .find('.video-item__watch-button')
      .click();

    cy.get('.playlist-videos-container').find('.video-item').should('have.length', 0);
  });

  it('시청한 영상을 본 영상 목록에서 확인할 수 있어야 한다.', () => {
    cy.get('.nav__watched-videos-menu').click();

    cy.get('.watched-videos-container').find('.video-item').should('have.length', 1);
  });

  it('영상을 삭제할 수 있어야 한다.', () => {
    cy.get('.watched-videos-container')
      .find('.video-item')
      .first()
      .find('.video-item__delete-button')
      .click();

    cy.get('.watched-videos-container').find('.video-item').should('have.length', 0);
  });
});
