import { VIDEO_COUNT } from '../../src/js/util/constants.js';

describe('유튜브 검색 및 비디오 저장 정상 작동 테스트', () => {
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

      cy.intercept('GET', 'https://www.googleapis.com/youtube/v3/search?*').as('getInitialVideos');

      // 검색
      cy.get('#search-input-keyword').type(keyword);
      cy.get('#search-button').click();
      // 스켈레톤 UI
      cy.get('.video-list').children('.skeleton').should('be.visible');

      cy.wait('@getInitialVideos');

      // 결과값 보여주기
      cy.get('.video-list')
        .children('.video-item')
        .should('be.visible')
        .and('have.length', VIDEO_COUNT)
        .and('not.have.class', 'skeleton');
    });

    // it('결과물의 맨 밑까지 스크롤을 내리면 추가적인 결과물을 확인할 수 있다', () => {
    //   cy.intercept('GET', 'https://www.googleapis.com/youtube/v3/search?*').as('getNextVideos');

    //   // 스크롤 내리기
    //   cy.get('.video-list').scrollTo('bottom');

    //   // 무한스크롤에 의한 결과값 보여주기
    //   cy.wait('@getNextVideos');
    //   cy.get('.video-list')
    //     .children('.video-item')
    //     .should('have.length', VIDEO_COUNT * 2);
    // });
  });

  context('저장 버튼을 클릭하면, 비디오ID를 저장할 수 있다', () => {
    after(() => {
      cy.saveLocalStorage();
    });

    it('저장 버튼을 클릭해 비디오ID를 저장한 후 해당 비디오의 저장 버튼이 사라진다.', () => {
      cy.get('.video-item__save-button').first().as('firstVideoSaveButton');

      cy.get('@firstVideoSaveButton').click();
      cy.get('@firstVideoSaveButton').should('not.be.visible');
    });
  });
});

describe('볼 영상 확인/ 본 영상 확인 / 영상 삭제 기능 테스트', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  context('볼 영상을 확인하고, 본 영상으로 체크할 수 있다', () => {
    it('첫 화면에서 볼 영상을 확인할 수 있다', () => {
      cy.reload();

      cy.get('.my-video-list').children('.video-item').should('have.length', 1);

      cy.get('.my-video-list').children('.video-item').first().as('myVideoItem');
      cy.get('@myVideoItem').find('.video-item__view-check-button').should('be.visible');
      cy.get('@myVideoItem').find('.video-item__delete-button').should('be.visible');
    });

    it('봤다는 버튼을 클릭하여 본 영상으로 체크할 수 있다', () => {
      cy.get('.my-video-list').children('.video-item').first().as('myVideoItem');

      cy.get('@myVideoItem').find('.video-item__view-check-button').click();
      cy.get('@myVideoItem').should('not.be.visible');
    });
  });

  context('비디오를 삭제하고, 저장된 영상이 없을 경우 메시지를 통해 확인할 수 있다.', () => {
    // it('삭제 버튼을 클릭하면, 비디오를 삭제할 수 있다', () => {});
    // it('저장된 영상이 없을 경우 메시지를 확인할 수 있다.', () => {});
  });
});

// describe('유튜브 검색 예외 사항 테스트', () => {
//   before(() => {
//     cy.visit('../../dist/index.html');
//     cy.get('#search-modal-button').click();
//   });

//   it('검색 결과가 없는 경우 결과없음 페이지를 확인할 수 있다', () => {
//     const noResultKeyword = '!@#!@$#$!#@!#';

//     cy.intercept('GET', `https://www.googleapis.com/youtube/v3/search?*`).as('getNoResult');

//     cy.get('#search-input-keyword').type(noResultKeyword);
//     cy.get('#search-button').click();

//     cy.wait('@getNoResult');

//     cy.get('.search-result--no-result').within(() => {
//       cy.get('img').should('have.attr', 'alt');
//     });
//   });
// });
