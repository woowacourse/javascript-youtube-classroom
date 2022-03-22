import { ERROR_MESSAGE } from '../../src/js/constant';

describe('모달창 테스트', () => {
  beforeEach(() => {
    cy.visit('dist/index.html');
  });

  it('검색 버튼을 누를시 모달창이 나온다.', () => {
    cy.get('#search-modal-button')
      .click()
      .then(() => {
        cy.get('.search-modal').should('be.visible');
      });
  });

  it('검색어를 입력후 검색버튼을 누를시 영상을 로드한다.', () => {
    const inputValue = 'jasmin';

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(inputValue);
    cy.get('#search-button')
      .click()
      .then(() => {
        cy.get('.video-item').should(($items) => expect($items).to.have.length(10));
      });
  });

  it('빈 검색어를 입력시 에러메시지를 보여준다', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#search-modal-button').click();
    cy.get('#search-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.NO_INPUT);
      });
  });

  it('검색결과가 없는 검색어를 입력하면 검색결과 없음 이미지를 보여준다.', () => {
    const wrongInput =
      '!@#!@$!#%@$^#%&$^*%!@#!$!#%&(^*#%$!@#!@$#$!#@!#)_)&_%^_)&%_^)&_@!@#!#$@#$%$@#^%&$%^&#$@$^#%&$%^$^%*$^&^@#$@#$@#%@#$^#%&^**#^#$%@#$@#$^@#$!$@#%@#$%#$^#$%^$%@#$!@#!@#%)^_&)%_^$%#$%#$^#%^#%^#^&_%^_)&_#$)%_)#_$)%#_$%!@#!@$#$!#@!#)_)&_%^_)&%_^)&_%)^_&)%_^&_%^_)&_#$)%_)#_$)%#_$%';

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(wrongInput);
    cy.get('#search-button')
      .click()
      .then(() => {
        cy.get('.video-list').should('be.hidden');
        cy.get('.no-result').should('be.visible');
      });
  });

  it('스크롤이 가장 밑에 도달하면 추가로 10개의 요소를 불러온다', () => {
    const inputValue = 'jasmin';

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(inputValue);
    cy.get('#search-button').click();
    cy.get('.video-list').scrollTo('bottom');
    cy.get('.video-item').should(($items) => expect($items).to.have.length(20));
  });

  it('저장버튼을 클릭하면 저장버튼이 보이지 않아야 한다.', () => {
    const inputValue = 'jasmin';

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(inputValue);
    cy.get('#search-button').click();
    cy.get('.video-item__save-button').eq(0).click();
    cy.get('.video-item__save-button').eq(0).should('be.hidden');
  });

  it('모달 바깥창을 클릭하면 모달창이 닫긴다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('.dimmer')
      .click({ force: true })
      .then(() => {
        cy.get('.search-modal').should('be.hidden');
      });
  });
});
