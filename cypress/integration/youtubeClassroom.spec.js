Cypress.Commands.add('normalSearchKeyword', (keyword, nextActionCallback) => {
  cy.get('#search-modal-button').click();
  cy.get('#search-input-keyword').type(keyword);
  cy.get('#search-button')
    .click()
    .then(() => {
      cy.get('.video-item__save-button').first().click();
      cy.get('.dimmer').click({ force: true });
      nextActionCallback();
    });
});

describe('비디오 저장, 체크, 삭제 테스트', () => {
  const keyword = 'playlist';

  beforeEach(() => {
    cy.viewport(1500, 1200);
    cy.visit('/');
  });

  it('검색 버튼을 눌러 모달창이 떠서 키워드를 검색하면, 저장 버튼을 눌러 검색한 비디오를 저장할 수 있다.', () => {
    const checkIfVideoIsSaved = () => {
      cy.get('.saved-video-list').children().should('exist');
    };
    cy.normalSearchKeyword(keyword, checkIfVideoIsSaved);
  });

  it('저장된 비디오(볼 비디오)의 체크 버튼을 눌러 본 비디오 탭에 있는지 확인한다.', () => {
    const checkIfVideoChecked = () => {
      cy.get('.video-item__check-button').first().click();
      cy.get('#watched-tab-button').click();
      cy.get('.saved-video-list').children().should('exist');
    };
    cy.normalSearchKeyword(keyword, checkIfVideoChecked);
  });

  it('저장된 비디오(볼 비디오)의 삭제 버튼을 누른 후, 확인을 누르고 비어있다는 이미지가 나오는지 확인한다.', () => {
    const checkIfVideoDeleted = () => {
      cy.get('.video-item__delete-button').first().click();
      cy.on('window:confirm', () => true);
      cy.get('.saved-video-list').children().should('have.class', 'save-result--no-result');
    };
    cy.normalSearchKeyword(keyword, checkIfVideoDeleted);
  });
});
