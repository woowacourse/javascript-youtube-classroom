describe('홈 화면 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('👁볼 영상 리스트에 영상이 존재하지 않으면 텅 빈 화면을 보여준다.', () => {
    cy.get('#watch-later-tab-menu-button').click();
    cy.get('.no-result__image').should('be.visible');
  });

  it('✅본 영상 리스트에 영상이 존재하지 않으면 텅 빈 화면을 보여준다.', () => {
    cy.get('#watched-tab-menu-button').click();
    cy.get('.no-result__image').should('be.visible');
  });

  it('키워드롤 검색한 영상을 저장하기 버튼을 클릭하면, 👁볼 영상 리스트에 렌더링된다', () => {
    const keyword = '지피티 구독자';

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(keyword);
    cy.get('#search-button')
      .click()
      .then(() => {
        cy.wait(1000);
        cy.get('.video-item__save-button').eq(0).click();
        cy.get('.video-item__save-button').eq(0).should('have.text', '저장 됨');
      });
    cy.get('.dimmer').click({ force: true });
    cy.get('.video-item').should('be.visible');
  });

  it('👁볼 영상 리스트에서 렌더링 된 영상을 ✅버튼 클릭시, ✅본 영상 리스트로 옮겨진다.', () => {
    const keyword = '지피티 구독자';

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(keyword);
    cy.get('#search-button')
      .click()
      .then(() => {
        cy.wait(1000);
        cy.get('.video-item__save-button').eq(0).click();
        cy.get('.video-item__save-button').eq(0).should('have.text', '저장 됨');
      });
    cy.get('.dimmer').click({ force: true });

    cy.get('.video-item__watch_button').eq(0).click();

    cy.get('#watched-tab-menu-button').click();
    cy.get('.watched-video-list').should((list) => expect(list).to.have.length(1));
  });

  it('✅본 영상 리스트에서 렌더링 된 영상을 ✅버튼 클릭시, 👁볼 영상 리스트로 옮겨진다.', () => {
    const keyword = '지피티 구독자';

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(keyword);
    cy.get('#search-button')
      .click()
      .then(() => {
        cy.wait(1000);
        cy.get('.video-item__save-button').eq(0).click();
        cy.get('.video-item__save-button').eq(0).should('have.text', '저장 됨');
      });
    cy.get('.dimmer').click({ force: true });

    cy.get('.video-item__watch_button').eq(0).click();

    cy.get('#watched-tab-menu-button').click();
    cy.get('.video-item__watch_button').eq(0).click();

    cy.get('#watch-later-tab-menu-button').click();
    cy.get('.watch-later-video-list').should((list) => expect(list).to.have.length(1));
  });

  it('영상 리스트에서 렌더링 된 영상을 🗑버튼 클릭시, 해당 영상을 삭제할 수 있다.', () => {
    const keyword = '지피티 구독자';

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(keyword);
    cy.get('#search-button')
      .click()
      .then(() => {
        cy.wait(1000);
        cy.get('.video-item__save-button').eq(0).click();
        cy.get('.video-item__save-button').eq(0).should('have.text', '저장 됨');
      });
    cy.get('.dimmer').click({ force: true });

    cy.get('.video-item__delete_button').eq(0).click();
    cy.on('window:confirm', () => true);
    cy.get('.video-item').should('not.be.visible');
  });
});
