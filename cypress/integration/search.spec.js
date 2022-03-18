import { ERROR_MESSAGE, SEARCH_KEYWORD_MIN_LENGTH } from '../../src/js/constants';

describe('검색 모달에서 검색어를 입력한다.', () => {
  const keyword = '검색어';
  const shortKeyword = '검';
  const noResultKeyword =
    '!@!@$!%@$^%&$^*%!@!$!%&(^*%$!@!@$$!#@!#)_)&_%^_)&%_^)&_@!@#!#$@#$%$@#^%&$%^&#$@$^#%&$%^$^%*$^&^@#$@#$@#%@#$^#%&^**#^#$%@#$@#$^@#$!$@#%@#$%#$^#$%^$%@#$!@#!@#%)^_&)%_^$%#$%#$^#%^#%^#^&_%^_)&_#$)%_)#_$)%#_$%!@#!@$#$!#@!#)_)&_%^_)&%_^)&_%)^_&)%_^&_%^_)&_#$)%_)#_$)%#_$%';

  beforeEach(() => {
    cy.visit('/index.html');
    cy.get('#search-modal-button').click();
  });

  it(`${SEARCH_KEYWORD_MIN_LENGTH}자 미만의 검색어를 입력할 시 에러메세지를 보여준다`, () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#search-input-keyword').type(shortKeyword);
    cy.get('#search-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.SEARCH_KEYWORD_MIN_LENGTH);
      });
  });

  it('모달 창에 검색어를 입력하면 결과가 나온다.', () => {
    cy.visit('/index.html');
    cy.get('#search-modal-button').click();
    cy.intercept('https://brave-lichterman-77e301.netlify.app/youtube/v3/search/*', {
      fixture: 'searchResult',
    });
    cy.get('#search-input-keyword').type(keyword);
    cy.get('#search-button').click();
    cy.get('.video-item').should('be.visible');
  });

  it('검색 결과가 없다면 결과 없음 화면을 보여준다.', () => {
    cy.intercept('https://brave-lichterman-77e301.netlify.app/youtube/v3/search/*', {
      fixture: 'noSearchResult',
    });
    cy.get('#search-input-keyword').type(noResultKeyword);
    cy.get('#search-button').click();
    cy.get('.search-result--no-result').should('be.visible');
  });
});
