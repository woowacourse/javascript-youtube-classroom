import { ERROR_MESSAGE } from '../../src/js/utils/constants.js';
import '../support/commands.js';

describe('검색 모달을 확인합니다.', () => {
  before(() => {
    cy.visit('../../dist/index.html');
  });

  it('빈 검색어로 검색을 하면 경고 메세지를 띄웁니다.', () => {
    const alerStub = cy.stub();
    cy.on('window:alert', alerStub);

    cy.search(' ').then(() => {
      expect(alerStub).to.be.calledWith(ERROR_MESSAGE.EMPTY_INPUT);
    });
  });

  it('검색을 진행하면 10개의 리스트를 보여줍니다.', () => {
    cy.get('.dimmer').click({ force: true });
    cy.search('우테코');
    cy.get('.video-list').children().its('length').should('be.equal', 10);
  });

  it('검색 후 아래로 스크롤하면 10개의 추가 데이터를 보여줍니다.', () => {
    cy.get('.video-list').scrollTo('bottom');
    cy.wait(5000);
    cy.get('.video-list').children().its('length').should('be.equal', 20);
  });
});
