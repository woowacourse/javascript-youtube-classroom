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
    cy.get('search-video-item').should('be.visible');
  });

  it('영상을 저장할 수 있어야 한다.', () => {
    const targetSaveButton = cy.get('.video-item__save-button').first();

    targetSaveButton.click();

    targetSaveButton.should('not.be.visible');
  });

  it('저장한 영상을 볼 영상 목록에서 확인할 수 있어야 한다.', () => {
    cy.get('.dimmer').click({ force: true });

    cy.hasCountVideoItems('.playlist-videos-container', 1);
  });

  it('영상을 시청할 수 있어야 한다.', () => {
    cy.watchVideo('.playlist-videos-container');

    cy.hasCountVideoItems('.playlist-videos-container', 0);
  });

  it('시청한 영상을 본 영상 목록에서 확인할 수 있어야 한다.', () => {
    cy.get('.nav__watched-videos-menu').click();

    cy.hasCountVideoItems('.watched-videos-container', 1);
  });

  it('영상을 삭제할 수 있어야 한다.', () => {
    cy.deleteVideo('.watched-videos-container');

    cy.hasCountVideoItems('.watched-videos-container', 0);
  });
});
