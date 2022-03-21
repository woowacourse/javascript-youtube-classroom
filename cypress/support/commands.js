import 'cypress-localstorage-commands';

Cypress.Commands.add('searchSaveVideo', () => {
  cy.visit('../../dist/index.html');

  cy.get('#search-modal-button').click();

  // 검색
  const keyword = 'javascript';
  cy.get('#search-input-keyword').type(keyword);
  cy.get('#search-button').click();

  // 저장
  cy.get('.video-item__save-button').first().as('firstVideoSaveButton');
  cy.get('@firstVideoSaveButton').click();
});
