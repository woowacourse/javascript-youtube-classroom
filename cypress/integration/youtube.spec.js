const baseUrl = 'http://localhost:9000/';

describe('영상을 검색한다.', () => {
  let videoId;

  before(() => {
    cy.visit(baseUrl);
  });

  it('영상을 검색 후 저장하기를 누르면 영상이 저장된다.', () => {
    const keyword = '블랙맘바';

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(keyword);
    cy.get('#search-button')
      .click()
      .wait(500)
      .then(() => {
        cy.get('.video-item__save-button').first().click();
        cy.get('.video-item')
          .first()
          .invoke('attr', 'data-video-id')
          .then((id) => {
            videoId = id;
          });
      });

    cy.get('.dimmer').click({ force: true });

    cy.get('#unwatched-video-list')
      .find('.video-item')
      .first()
      .invoke('attr', 'data-video-id')
      .then((id) => {
        expect(id).to.eq(videoId);
      });
  });

  it('저장된 영상을 "본 영상"으로 표시할 수 있다.', () => {
    cy.get(`[data-video-id=${videoId}]`)
      .find('[data-action=watch]')
      .click({ force: true })
      .then(() => {
        cy.get('#watched-video-list')
          .find('.video-item')
          .first()
          .invoke('attr', 'data-video-id')
          .then((id) => {
            expect(id).to.eq(videoId);
          });
      });
  });

  it('저장된 영상을 삭제할 수 있다.', () => {
    cy.get(`[data-video-id=${videoId}]`)
      .find('[data-action=remove]')
      .click({ force: true })
      .then(() => {
        cy.get('#watched-video-list').find('.video-item').should('not.exist');
      });
  });
});
