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

  it('검색한 영상들의 json데이터가 Web Storage에 저장되는지 테스트 한다.', () => {
    typeSearchKeywordAndClickToSubmitButton('우테코');
    cy.get('[data-js="youtube-search-modal__save"]').click();

    // 웹 스토리지에 저장되어있는지 확인
  });

  it('웹 스토리지에 100개의 동영상이 있을 때 동영상이 추가로 저장되지 않는지 테스트한다.', () => {
    // 웹 스토리지에 더미 데이터 100개를 넣고

    typeSearchKeywordAndClickToSubmitButton('우테코');
    cy.get('[data-js="youtube-search-modal__save"]').click();

    // 웹스토리지 확인
  });

  it('검색창을 다시 열었을 때 마지막 검색결과가 나오는지 테스트한다.', () => {
    typeSearchKeywordAndClickToSubmitButton('우테코');
    cy.get('[data-js="youtube-serach-modal__close"]').click();
    cy.get('#search-button').click();
    cy.get('[data-js="youtube-search-modal__clip"]').should('be.visible');
  });

  it('검색창의 하단에 최근 검색 키워드 3개가 표시되는지 테스트한다.', () => {
    const keywords = ['우', '테', '코'];
    keywords.forEach((keyword) => {
      typeSearchKeywordAndClickToSubmitButton(keyword);
    });

    keywords.reverse().forEach((keyword, index) => {
      cy.get('[data-js="youtube-search-modal__chip"]')
        .eq(index)
        .should('have.text', keyword);
    });
  });
});
