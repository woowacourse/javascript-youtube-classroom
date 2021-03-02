describe('유튜브 검색 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#search-button').click();
  });

  const typeSearchKeywordAndClickToSubmitButton = (keyword) => {
    cy.get('[data-js="youtube-search-modal__input"]').type(keyword);
    cy.get('[data-js="youtube-search-modal__submit"]').click();
  };

  it('우테코를 검색하고 검색 결과가 나타나기 전에 로딩 컴포넌트가 나타나는지 테스트한다.', () => {
    typeSearchKeywordAndClickToSubmitButton('우테코');
    cy.get('[data-js="youtube-search-modal__skeleton"]').should('be.visible');
  });

  it('우테코를 검색후 검색 결과가 10개까지 나타나는지 테스트한다.', () => {
    typeSearchKeywordAndClickToSubmitButton('우테코');
    cy.get('[data-js="youtube-search-modal__clip"]').should('have.length', 10);
  });

  it('우테코를 검색후 스크롤을 끝까지 내렸을 때 아이템이 추가로 나타나는지 테스트한다.', () => {
    typeSearchKeywordAndClickToSubmitButton('우테코');
    cy.get('[data-js="youtube-search-modal"]').scrollTo('0%', '100%');
    cy.get('[data-js="youtube-search-modal__clip"]').should('have.length', 20);
  });

  it('"$@#@$@$"를 검색했을 때 검색 결과가 없는 경우 결과없음 이미지와 텍스트가 나타나는지 테스트한다.', () => {
    typeSearchKeywordAndClickToSubmitButton('$@#@$@$');
    cy.get('[data-js="youtube-search-modal__not-found"]').should('be.visible');
  });

