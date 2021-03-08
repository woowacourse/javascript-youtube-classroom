import { YOUTUBE } from '../../src/js/utils/constant.js';

describe('나만의 유튜브 강의실 검색 테스트', () => {
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
    cy.get('[data-js="youtube-search-modal__skeleton-wrapper"]').should(
      'be.visible',
    );
  });

  it('우테코를 검색후 검색 결과가 10개까지 나타나는지 테스트한다.', () => {
    typeSearchKeywordAndClickToSubmitButton('우테코');
    cy.get('[data-js="youtube-search-modal__clip"]').should(
      'have.length',
      YOUTUBE.NUMBER_TO_LOAD,
    );
  });

  it('우테코를 검색후 스크롤을 끝까지 내렸을 때 아이템이 추가로 나타나는지 테스트한다.', () => {
    typeSearchKeywordAndClickToSubmitButton('우테코');
    cy.scrollTo('0%', '100%');
    cy.get('[data-js="youtube-search-modal__clip"]').then((clips) => {
      expect(clips.length).to.be.greaterThan(YOUTUBE.NUMBER_TO_LOAD);
    });
  });

  it('"8123579823476"를 검색했을 때 결과없음 이미지가 나타나는지 테스트한다.', () => {
    typeSearchKeywordAndClickToSubmitButton('8123579823476');
    cy.get('[data-js="youtube-search-modal__not-found"]').should('be.visible');
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
    cy.get('[data-js="youtube-search-modal__chip"]').should('have.length', 3);
  });
});
