import {
  NUM_OF_CLIP_PER_FETCH,
  MAX_NUM_OF_SAVED_VIDEO,
  NUM_OF_SEARCH_KEYWORD_HISTORY,
  LOCAL_STORAGE_SAVED_VIDEO_KEY,
  SNACKBAR_MESSAGE,
} from '../../src/js/constants/index.js';

describe('유튜브 검색 테스트', () => {
  before(() => {
    cy.visit('http://localhost:5500/');
  });

  const original = localStorage.getItem(LOCAL_STORAGE_SAVED_VIDEO_KEY);
  localStorage.clear();

  it('동영상 검색 버튼을 클릭 시 모달을 화면에 띄운다.', () => {
    cy.get('.js-search-button').click();
    cy.get('.modal').should('be.visible');
  });

  it('검색 결과가 없는 경우 결과 없음 이미지와 메세지를 화면에 띄운다.', () => {
    const searchInput = 'aefasfase';

    cy.get('.js-search-input').type(searchInput).type('{enter}');
    cy.get('.chip').eq(0).contain(searchInput);
    cy.get('.js-not-found-image').should('be.visible');
  });

  it(`최초 검색결과는 ${NUM_OF_CLIP_PER_FETCH}개까지만 보여준다.`, () => {
    const searchInput = '테코톡';

    cy.get('.js-search-input').type(searchInput);
    cy.get('.js-search-submit').click();
    cy.get('.chip').eq(0).contain(searchInput);
    cy.get('.clip').should('have.length', NUM_OF_CLIP_PER_FETCH);
  });

  it(`스크롤을 끝까지 내렸을 때, 추가로 ${NUM_OF_CLIP_PER_FETCH}개의 검색 결과를 가지고 온다.`, () => {
    cy.get('.modal').scrollTo('bottom');
    cy.get('.clip').should('have.length', NUM_OF_CLIP_PER_FETCH * 2);
  });

  it('동영상의 저장 버튼을 누르면, 동영상의 id를 localStorage에 저장한다.', () => {
    cy.get('.js-clip-save-button').eq(0).click();

    cy.document().then(document => {
      const savedCilpList = localStorage.getItem(LOCAL_STORAGE_SAVED_VIDEO_KEY);
      const clipId = document.querySelector('.js-clip-save-button').dataset.clipId;

      expect(savedCilpList.includes(clipId)).to.equal(true);
      cy.get('.js-num-of-saved-clip').should('have.text', `1/${MAX_NUM_OF_SAVED_VIDEO}`);
    });
  });

  it('동영상이 이미 저장된 경우에는 저장버튼이 보이지 않게 한다.', () => {
    cy.get('.js-clip-save-button').eq(0).should('not.be.visible');
  });

  it(`최근 검색 키워드를 ${NUM_OF_SEARCH_KEYWORD_HISTORY}개까지 화면상의 검색창 하단에 보여준다.`, () => {
    const dummies = Array(NUM_OF_SEARCH_KEYWORD_HISTORY)
      .fill()
      .map((v, i) => `keyword${i}`);

    dummies.forEach(keyword => {
      cy.get('.js-search-input').type(keyword).type('{enter}');
    });

    cy.get('.chip').each(($el, index) => {
      cy.wrap($el).should('have.text', dummies[NUM_OF_SEARCH_KEYWORD_HISTORY - index - 1]);
    });
  });

  it('검색 모달에 다시 접근했을 때 가장 마지막에 검색한 키워드로 검색한 결과를 보여준다.', () => {
    const keyword = '우테코';

    cy.document().then(document => {
      cy.get('.js-search-input').type(keyword).type('{enter}');

      const searchResult = document.querySelector('.modal');

      cy.get('.js-search-modal-close-button').click();
      cy.get('.modal').should('not.be.visible');
      cy.get('.js-search-button').click();

      expect(document.querySelector('.modal') === searchResult).to.equal(true);
    });
  });

  it(`저장된 동영상의 개수가 ${MAX_NUM_OF_SAVED_VIDEO}개일 때, 동영상 저장 버튼을 누르면 하단에 snackbar를 통해 안내 메세지를 띄운다.`, () => {
    localStorage.clear();
    const dummies = Array(MAX_NUM_OF_SAVED_VIDEO).fill('0');
    localStorage.setItem(LOCAL_STORAGE_SAVED_VIDEO_KEY, dummies);

    cy.get('.js-clip-save-button').eq(0).click();
    cy.get('.snackbar').should('be.visible').should('have.text', SNACKBAR_MESSAGE.OVER_MAX_NUM_OF_SAVED_VIDEO);
  });

  localStorage.setItem(LOCAL_STORAGE_SAVED_VIDEO_KEY, original);
});
