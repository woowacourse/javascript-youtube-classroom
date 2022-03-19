describe('비디오 관련 액션 테스트', () => {
  beforeEach(() => {
    cy.viewport(1800, 900);
    cy.visit('http://localhost:9000/');
  });

  it('비디오 검색, 비디오 저장, 본 비디오 체크, 비디오 삭제가 가능해야 한다', () => {
    cy.get('#search-modal-button').click();
    cy.get('.search-input__keyword').type('잔나비');
    cy.get('.search-input__search-button')
      .click()
      .then(() => {
        cy.get('.video-item').get('h4').eq(0).invoke('text')
          .then((text1) => {
            cy.get('.video-item__save-button').first().click();
            cy.get('.dimmer').click({ force: true });
            const videoItem = cy.get('.video-item');
            const saveVideoTitle = videoItem.get('h4').first();
            saveVideoTitle.should('have.text', text1);

            videoItem.get('.watched-video-button').eq(0).click();
            cy.get('#watched-section-button').click();
            const watchedVideoTitle = videoItem.get('h4').eq(0);
            watchedVideoTitle.should('have.text', text1);

            videoItem.get('.delete-video-button').eq(0).click();
            cy.on('window.confirm', () => {
              returns(true);
            })
            cy.get('.watched-video-list').children().should('not.have', '');
          });
      });
  });
});
