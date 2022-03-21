describe('모달창 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('검색 버튼을 클릭하면 모달창이 보인다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('.modal-container').should('be.visible');
  });

  it('모달창 바깥 부분을 클릭하면 모달창이 보이지 않는다', () => {
    cy.get('#search-modal-button').click();
    cy.get('.dimmer').click({ force: true });
    cy.get('.search-modal').should('not.be.visible');
  });

  it('영상 키워드를 입력하면, 관련된 영상이 렌더링된다.', () => {
    const keyword = '지피티 구독자';

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(keyword);
    cy.get('#search-button')
      .click()
      .then(() => {
        cy.get('.video-item').should((items) => expect(items).to.have.length(10));
      });
  });

  it('관련된 영상이 없는 키워드를 입력하면, 결과없음 페이지를 렌더링한다.', () => {
    const keyword = '!@#$!@$@#$!$#@$!$@$!@';

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(keyword);
    cy.get('#search-button')
      .click()
      .then(() => {
        cy.get('.modal-video-list').should('not.be.visible');
        cy.get('.no-result').should('be.visible');
      });
  });

  it('영상 키워드를 입력하고 렌더링된 영상의 저장버튼을 클릭하면, 저장 됨으로 텍스트가 변경된다.', () => {
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
  });
});
