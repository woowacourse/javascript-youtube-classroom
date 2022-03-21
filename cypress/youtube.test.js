const baseURL = 'http://localhost:9000/';
beforeEach(() => {
  cy.visit(baseURL);
});

describe('mainPage', () => {
  it('mainPage 방문 시, 볼 영상 리스트가 렌더링된다', () => {
    cy.get('.main__video-list').should('not.have.class','watched-video-list');
  })

  it('본 영상 리스트 버튼을 누르면, 본 영상 리스트가 렌더링된다.', () => {
    cy.get('.nav__no-watched-button').click().then(() =>{
      cy.get('.main__video-list').should('have.class','watched-video-list');
    });
  })

  it('볼 영상 리스트 버튼을 누르면, 볼 영상 리스트가 렌더링된다.', () => {
    cy.get('.nav__no-watched-button').click().then(() =>{
      cy.get('.main__video-list').should('not.have.class','watched-video-list');
    });
  })

  it('검색 버튼을 누르면, 모달창을 열 수 있다.', () => {
    cy.get('#search-modal-button').click().then(() => {
      cy.get('.modal-container').should('be.visible');
    });
  })

  it('모달창이 열린 상태에서 dimmer를 누르면, 모달창을 닫을 수 있다', () => {
    cy.get('#search-modal-button').click().then(() => {
      cy.get('.modal-container').should('be.visible');
    });
    cy.get('.dimmer').click({force: true}).then(() => {
      cy.get('.modal-container').should('not.be.visible');
    });
  })
});