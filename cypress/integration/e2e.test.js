import { VIDEO_COUNT } from '../../src/js/util/constants.js';

// localStorage 초기화도 필요해보임

describe('유튜브 검색 정상 작동 테스트', () => {
  before(() => {
    cy.visit('../../dist/index.html');
  });

  context('모달창을 열고 검색하면, 결과물을 확인할 수 있다', () => {
    it('검색 버튼을 클릭해 모달창을 확인할 수 있다', () => {
      cy.get('#search-modal-button').click();

      cy.get('.search-modal').should('be.visible');
    });

    it('검색창에 검색어를 입력하고 검색 버튼을 클릭하면 결과물을 확인할 수 있다', () => {
      const keyword = 'javascript';

      cy.intercept(
        'GET',
        `https://www.googleapis.com/youtube/v3/search?type=video&key=${Cypress.env(
          'YOUTUBE_API_KEY'
        )}&q=${keyword}&part=snippet&maxResults=${VIDEO_COUNT}`
      ).as('getVideos');

      // 검색
      cy.get('#search-input-keyword').type(keyword);
      cy.get('#search-button').click();
      // 스켈레톤 UI
      cy.get('.video-list').children('.skeleton').should('be.visible');

      cy.wait('@getVideos');

      // 결과값 보여주기
      cy.get('.video-list')
        .children('.video-item')
        .should('be.visible')
        .and('have.length', VIDEO_COUNT)
        .and('not.have.class', 'skeleton');
    });

    it('결과물의 맨 밑까지 스크롤을 내리면 추가적인 결과물을 확인할 수 있다', () => {
      const keyword = 'javascript';

      cy.intercept(
        'GET',
        `https://www.googleapis.com/youtube/v3/search?type=video&key=${Cypress.env(
          'YOUTUBE_API_KEY'
        )}&q=${keyword}&part=snippet&maxResults=${VIDEO_COUNT}&pageToken=CAoQAA`
      ).as('getNextVideos');

      // 스크롤 내리기
      cy.get('.video-list').scrollTo('bottom');

      // 무한스크롤에 의한 결과값 보여주기
      cy.wait('@getNextVideos');
      cy.get('.video-list')
        .children('.video-item')
        .should('have.length', VIDEO_COUNT * 2);
    });
  });
  context('저장 버튼을 클릭하면, 비디오ID를 저장할 수 있다', () => {
    // 저장하고 저장 버튼을 안볼 수 있다.
    // it('저장 버튼을 클릭해 비디오ID를 저장한 후 해당 비디오의 저장 버튼이 사라진다.', () => {});
  });
});

describe('검색 모달창 관련 실패 테스트', () => {
  it('검색 결과가 없는 경우 결과없음 페이지를 확인할 수 있다', () => {
    // 검색어를 비워준다.
    // 검색을 한다
    // no result를 보여준다
  });
});
