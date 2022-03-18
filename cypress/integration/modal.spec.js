import { ERROR } from '../../src/js/constants/error.js';

const validSearchInput = 'test';
const inValidSearchInput = {
  emptyInput: ' ',
  noResultInput:
    '!@#!@$!#%@$^#%&$^*%!@#!$!#%&(^*#%$!@#!@$#$!#@!#)_)&_%^_)&%_^)&_@!@#!#$@#$%$@#^%&$%^&#$@$^#%&$%^$^%*$^&^@#$@#$@#%@#$^#%&^**#^#$%@#$@#$^@#$!$@#%@#$%#$^#$%^$%@#$!@#!@#%)^_&)%_^$%#$%#$^#%^#%^#^&_%^_)&_#$)%_)#_$)%#_$%!@#!@$#$!#@!#)_)&_%^_)&%_^)&_%)^_&)%_^&_%^_)&_#$)%_)#_$)%#_$%',
};

describe('모달창 테스트', () => {
  beforeEach(() => {
    cy.visit('dist/index.html');
  });

  it('검색 버튼을 클릭한 경우, 모달창이 눈에 보인다.', () => {
    cy.get('#search-modal-button')
      .click()
      .then(() => {
        cy.get('.search-modal').should('be.visible');
      });
  });

  it('모달창의 외부 영역을 클릭한 경우, 모달창이 종료된다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('.dimmer')
      .click({ force: true })
      .then(() => {
        cy.get('.search-modal').should('be.hidden');
      });
  });

  it('빈 검색어로 검색한 경우, 에러메시지를 보여준다', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(inValidSearchInput.emptyInput);
    cy.get('#search-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(ERROR.MESSAGE.EMPTY_INPUT);
      });
  });

  it('검색결과가 없는 검색어를 입력하면 검색결과 없음 이미지를 보여준다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(inValidSearchInput.noResultInput);
    cy.get('#search-button')
      .click()
      .then(() => {
        cy.get('.video-list').should('have.class', 'hide');
        cy.get('.no-result').should('be.visible');
      });
  });

  it('올바른 검색어로 검색한 경우, 검색 결과를 10개 보여준다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(validSearchInput);
    cy.get('#search-button')
      .click()
      .then(() => {
        cy.get('.video-list').children().should('have.length', 10);
      });
  });

  it('스크롤이 가장 밑에 도달한 경우, 10개의 요소를 추가적으로 불러온다', () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(validSearchInput);
    cy.get('#search-button').click();

    cy.get('.video-list')
      .scrollTo('bottom')
      .then(() => {
        cy.get('.video-list').children().should('have.length', 20);
      });
  });
});
