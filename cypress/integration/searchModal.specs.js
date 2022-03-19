import { getLocalStorage } from '../../src/js/domain/localStorage';

describe('검색 테스트', () => {
  beforeEach(() => {
    cy.visit('./index.html');
    cy.get('#search-modal-button').click();
  });

  it('검색창에 입력하지 않고 검색버튼을 눌렀을때 경고 메시지가 뜬다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    cy.get('#search-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith();
      });
  });

  it('검색값이 없는 입력값을 입력하면 검색결과가 없는 이미지 창을 보여준다.', () => {
    cy.searchVideo('no-result-keyword', 'noResult.json');
    cy.get('.no-result__image').should('be.visible');
  });

  it('검색어가 있는 입력값을 입력하면 해당 검색에 맞는 검색결과를 보여준다.', () => {
    cy.searchVideo('have-result-keyword', 'searchResult.json');
    cy.get('.video-item').should('be.visible').should('have.length', 10);
  });

  it('검색어를 입력한 후 스크롤을 내리면 추가로 검색결과를 더 보여준다.', () => {
    cy.searchVideo('have-result-keyword', 'searchResult.json');
    cy.get('.video-item').should('be.visible').should('have.length', 10);
    cy.get('.video-list').scrollTo('bottom');
    cy.wait(8000);
    cy.get('.video-item').should('be.visible').should('have.length', 20);
  });

  it('검색어가 있는 입력값을 입력한 후 저장버튼을 클릭하면 localStorage에 저장된다.', () => {
    cy.searchVideo('have-result-keyword', 'searchResult.json');
    cy.get('[data-id="RjLh2rI1R3k"]')
      .click()
      .then(() => {
        expect(getLocalStorage('save')).to.includes('RjLh2rI1R3k');
      });
  });
});
