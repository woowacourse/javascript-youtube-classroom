Cypress.Commands.add('openModal', () => {
  cy.get('#search-modal-button').click();
});

Cypress.Commands.add('closeModal', () => {
  cy.get('.dimmer').click({ force: true });
});

Cypress.Commands.add('inputKeyword', keyword => {
  cy.get('#search-input-keyword').type(keyword);
  cy.get('#search-button').click();
});

Cypress.Commands.add('searchKeyword', keyword => {
  cy.openModal();
  cy.get('#search-input-keyword').type(keyword);
  cy.get('#search-button').click();
});

Cypress.Commands.add('saveFirstVideo', keyword => {
  cy.searchKeyword(keyword);
  cy.get('.list-item__save-button').first().click();
});

Cypress.Commands.add('checkAlertMessage', expectedMessage => {
  cy.on('window:alert', str => {
    expect(str).to.equal(expectedMessage);
  });
});
