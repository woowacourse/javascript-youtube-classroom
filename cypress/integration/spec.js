describe('비디오 없을 시', () => {
  it('검색모달에 결과 없는 검색어 입력시 검색어 없음 이미지를 보여준다', () => {
    cy.visit('http://localhost:9000/');
    cy.get('#search-modal-button').click();
    cy.get('#modal-container').then((element) => {
      expect(element).not.to.have.class('hide');
    });
    cy.get('#search-input-keyword').type('뚫맆햇홓캽돑셅밡');
    cy.get('#search-button').click();
    cy.get('#search-result').find('.no-result');
  });

  it(`검색모달에 검색어를 입력하여 검색하고 저장버튼을 눌러 저장할 수 있다.
   볼 영상을 누르면 저장한 영상을 확인하고 체크버튼을 누르면 본 영상으로 이동한다.
    삭제버튼을 누르면 영상이 삭제된다.`, () => {
    cy.visit('http://localhost:9000/');
    cy.get('#search-modal-button').click();
    cy.get('#modal-container').then((element) => {
      expect(element).not.to.have.class('hide');
    });
    cy.get('#search-input-keyword').type('손흥민 선발출전');
    cy.get('#search-button').click();
    cy.get('#search-result').find('.video-item');

    cy.get('.video-item__save-button').first();
    cy.get('.video-item__save-button').first().click();
    cy.getLocalStorage('videoId').should('have.length.at.least', 1);

    cy.get('#close-modal-button').click();

    cy.get('#will-see-video-button').click();
    cy.get('.video-item-container').should('not.exist');

    cy.get('.already-watch-button').first().click();
    cy.get('#already-watched-video-button').click();
    cy.get('#classroom-contents-container').find('.video-item-container');
    cy.get('.discard-button').first().click();
    cy.on('window:confirm', () => true);
    cy.get('.video-item-container').should('not.exist');
  });
});
