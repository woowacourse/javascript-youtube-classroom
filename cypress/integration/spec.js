/*describe('비디오 없을 시', () => {
  before(() => {
    cy.visit('http://localhost:9000/');
    cy.get('#search-modal-button').click();
    cy.get('#modal-container').then((element) => {
      expect(element).not.to.have.class('hide');
    });
  });

  it('검색모달에 결과 없는 검색어 입력시 검색어 없음 이미지를 보여준다', () => {
    cy.get('#search-input-keyword').type('뚫맆햇홓캽돑셅밡');
    cy.get('#search-button').click();
    cy.get('#search-result').find('.no-result');
  });
});
*/
describe('비디오 잇을시', () => {
  before(() => {
    cy.visit('http://localhost:9000/');
    cy.get('#search-modal-button').click();
    cy.get('#modal-container').then((element) => {
      expect(element).not.to.have.class('hide');
    });
  });

  it('검색모달에 검색어를 입력하여 검색하고 저장버튼을 눌러 저장할 수 있다.', () => {
    cy.get('#search-input-keyword').type('손흥민 선발출전');
    cy.get('#search-button').click();
    cy.get('#search-result').find('.video-item');

    cy.get('.video-item__save-button').first();
    cy.get('.video-item__save-button').first().click();
    cy.getLocalStorage('videoId').should('have.length.at.least', 1);
  });

  it(`볼 영상을 누르면 저장한 영상을 확인할 수 있다.`, () => {
    cy.get('#search-input-keyword').type('손흥민 선발출전');
    cy.get('#search-button').click();
    cy.get('#search-result').find('.video-item');

    cy.get('.video-item__save-button').first();
    cy.get('.video-item__save-button').first().click();
    cy.get('#close-modal-button').click();

    cy.get('#will-see-video-button').click();
    cy.get('#classroom-contents-container').find('.video-item-container').should('exist');
  });

  it('체크버튼을 누르면 영상이 본 영상으로 이동한다', () => {
    cy.get('.already-watch-button').first().click();
    cy.get('#already-watched-video-button').click();
    cy.get('#classroom-contents-container').find('.video-item-container').should('exist');
  });

  it('삭제버튼을 누르면 영상이 삭제된다', () => {
    cy.get('.discard-button').first().click();
    cy.get('#classroom-contents-container').find('.video-item-container').should('not.exist');
  });
});
