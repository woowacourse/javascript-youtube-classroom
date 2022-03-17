describe('핵심 기능 플로우 테스트', () => {
  const baseUrl = 'http://localhost:9000';

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.intercept(
      {
        method: 'GET',
        url: '**/youtube/v3/search?*',
      },
      { fixture: './dummy' }
    ).as('getSearchResult');

    cy.intercept(
      {
        method: 'GET',
        url: '**/youtube/v3/video?*',
      },
      { fixture: './dummy' }
    ).as('getVideo');

    cy.on('window:confirm', () => true);
  });

  it('비디오를 검색해서 저장할 수 있다', () => {
    // given
    cy.saveVideo();

    // then
    cy.get('.video-list').children().should('exist');
  });

  it('볼 영상 탭에서 비디오를 본 영상으로 설정하면 본 영상 탭에서 확인할 수 있다.', () => {
    // given
    cy.saveVideo();

    // when
    cy.get('.video-item__watched-button').first().click();

    cy.get('#watched-list-button').click();
    cy.wait('@getVideo');

    // then
    cy.get('.video-list').children().should('exist');
  });

  it('저장한 영상을 삭제할 수 있다.', () => {
    // given
    cy.saveVideo();

    cy.get('.saved-videos .video-list')
      .children()
      .as('original')
      .then((original) => {
        //when
        cy.get('.video-item__unsave-button').first().click();

        // then
        cy.get('.saved-videos .video-list')
          .children()
          .should('have.length', original.length - 1);
      });
  });
});
