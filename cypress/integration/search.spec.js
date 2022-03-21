import { ERROR_MESSAGE, SEARCH_KEYWORD_MIN_LENGTH, REQUEST_PATH, SECOND_HOST_URL } from '../../src/js/constants';

describe('검색 버튼을 누르면 검색 모달이 띄어진다.', () => {
  it('초기 화면에서 검색 버튼을 누르면 검색 모달이 나온다.', () => {
    cy.visit('/index.html');
    cy.get('#search-modal-button').click();
    cy.get('#modal-container').should('be.visible');
  });
});

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
    cy.intercept(`${SECOND_HOST_URL}${REQUEST_PATH}/*`, {
      fixture: 'searchResult',
    });
    cy.get('#search-input-keyword').type(keyword);
    cy.get('#search-button').click();
    cy.get('.video-item').should('be.visible');
  });

  it('검색 결과가 없다면 결과 없음 화면을 보여준다.', () => {
    cy.intercept(`${SECOND_HOST_URL}${REQUEST_PATH}/*`, {
      fixture: 'noSearchResult',
    });
    cy.get('#search-input-keyword').type(noResultKeyword);
    cy.get('#search-button').click();
    cy.get('.search-result--no-result').should('be.visible');
  });
});

describe('검색어 입력 후 저장 버튼으로 동영상을 저장할 수 있다.', () => {
  const keyword = '검색어';
  beforeEach(() => {
    cy.visit('/index.html');
    cy.get('#search-modal-button').click();
  });

  it('저장 버튼을 누르면 저장 버튼이 사라진다.', () => {
    cy.intercept(`${SECOND_HOST_URL}${REQUEST_PATH}/*`, {
      fixture: 'searchResult',
    });
    cy.get('#search-input-keyword').type(keyword);
    cy.get('#search-button').click();
    cy.get('#search-result-video-list > li:nth-child(1) > button').click();
    cy.get('#search-result-video-list > li:nth-child(1) > button').should('be.not.visible');
  });
});
