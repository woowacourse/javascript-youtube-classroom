const URL = 'http://localhost:9000';

describe('Modal 기능', () => {
  before(() => {
    cy.visit(URL);
  });
  it('검색 버튼을 클릭하면 모달을 볼 수 있다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('#modal').should('be.visible');
  });

  it('모달 바깥 영역을 클릭하면 모달을 닫는다.', () => {
    cy.get('.dimmer').click({ force: true });
    cy.get('#modal').should('not.be.visible');
  });
});

describe('검색 기능', () => {
  before(() => {
    cy.visit(URL);
  });
  it('검색 결과가 없을 경우 안내 이미지를 볼 수 있다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type('ddkjfkdjfkdjkfjkdjkfjkdjfkjdkfjkdlslk');
    cy.get('#search-button').click();
    cy.get('.no-result__image').should('be.visible');
  });
});

describe('탭 변환 기능', () => {});
