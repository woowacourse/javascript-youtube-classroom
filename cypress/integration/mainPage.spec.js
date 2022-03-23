const validSearchInput = 'test';

describe('메인페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('dist/index.html');
  });

  it('저장된 영상이 없는 경우, 비어있다는 것을 알리는 이미지를 보여준다.', () => {
    cy.get('.nothing-saved__image').should('be.visible');
  });

  it('저장된 영상이 있는 경우, 볼 영상 목록을 확인할 수 있다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(validSearchInput);
    cy.get('#search-button').click();

    cy.get('.video-item__save-button').first().click();

    cy.get('.dimmer')
      .click({ force: true })
      .then(() => {
        cy.get('.video-item').should('be.visible');
      });
  });

  it('저장한 영상의 시청 버튼 클릭시, 영상 목록에서 사라진다. ', () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(validSearchInput);
    cy.get('#search-button').click();

    cy.get('.video-item__save-button').first().click();

    cy.get('.dimmer').click({ force: true });

    cy.get('.video-item__watched-button')
      .click()
      .then(() => {
        cy.get('.saved-video-list').children().should('have.length', 0);
      });
  });

  it('저장한 영상의 삭제 버튼 클릭시, 영상 목록에서 사라진다. ', () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(validSearchInput);
    cy.get('#search-button').click();

    cy.get('.video-item__save-button').first().click();

    cy.get('.dimmer').click({ force: true });

    cy.get('.video-item__delete-button')
      .click()
      .then(() => {
        cy.get('.nothing-saved__image').should('be.visible');
      });
  });

  it('저장한 영상의 시청 버튼 클릭 후, 볼 영상 버튼을 클릭하면 요소를 확인할 수 있다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(validSearchInput);
    cy.get('#search-button').click();

    cy.get('.video-item__save-button').first().click();

    cy.get('.dimmer').click({ force: true });

    cy.get('.video-item__watched-button').click();

    cy.get('#watched-button')
      .click()
      .then(() => {
        cy.get('.saved-video-list').children().should('have.length', 1);
      });
  });

  it('본 영상 버튼 클릭 후 저장된 영상 리스트의 삭제 버튼을 누르면, 영상 목록에서 사라진다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(validSearchInput);
    cy.get('#search-button').click();

    cy.get('.video-item__save-button').first().click();

    cy.get('.dimmer').click({ force: true });
    cy.get('.video-item__watched-button').click();
    cy.get('#watched-button').click();
    cy.get('.video-item__delete-button')
      .click()
      .then(() => {
        cy.get('.nothing-saved__image').should('be.visible');
      });
  });
});
