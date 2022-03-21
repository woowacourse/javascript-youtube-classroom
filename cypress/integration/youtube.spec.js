import { DELETE_CONFIRM_MESSAGE } from '../../src/js/constants';

describe('구현 결과가 요구사항과 일치해야 한다.', () => {
  const baseUrl = './index.html';

  before(() => {
    cy.visit(baseUrl);
  });

  it('검색어를 검색 후, 영상을 저장 한 뒤, 초기화면으로 이동하면 저장한 영상의 id 값이 같은 영상이 초기화면에 보여줘야 한다.', () => {
    // 검색어 검색
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type('호랑이');
    cy.get('#search-button').click();

    cy.intercept(
      'https://competent-haibt-c82cf4.netlify.app/dummy/youtube/v3/search?*',
    ).as('search');

    // 저장 버튼 클릭
    cy.get('.video-item').should('be.visible');
    cy.get('.video-list > li:first > .video-item__save-button').click();
    cy.get('.video-list > li:first').then(($li) => {
      const dataId = $li.attr('data-video-id');
      cy.log(dataId);

      // 초기화면 이동
      cy.get('.dimmer').click(0, 0, { force: true });
      cy.get('.stored-result > .video-list > li:first').then(($storedLi) => {
        expect($storedLi.attr('data-video-id')).to.equal(dataId);
      });
    });
  });

  it('초기화면의 필터값이 볼 영상 일떄, 영상의 체크 버튼을 클릭하면 해당 영상은 볼 영상 필터 화면에서 사라지고 본 영상 필터을 클릭 하면 해당 영상이 보여진다.', () => {
    cy.get('nav').children('#stored-video-filter-button').then(($btn) => {
      const isStoredFilter = $btn.attr('class').includes('clicked');
      expect(isStoredFilter).to.be.true;
    });

    cy.get('.stored-result > .video-list > li:first').then(($storedLi) => {
      const dataId = $storedLi.attr('data-video-id');
      cy.log(dataId);

      cy.get($storedLi)
        .children('.video-item__buttons-wrapper')
        .children('.video-item__watched-button')
        .then(($btn) => {
          $btn.click();
        });

      cy.get('nav').children('#watched-video-filter-button').click();
      cy.get('.stored-result > .video-list > li:first').then(($watchedLi) => {
        expect($watchedLi.attr('data-video-id')).to.equal(dataId);
      });
    });
  });

  it('초기 화면의 영상 제거 버튼을 클릭하면 삭제 유무를 물어 보고 삭제를 하면 해당 영상이 화면에서 지워진다.', () => {
    cy.get('.stored-result > .video-list > li:first').then(($storedLi) => {
      const dataId = $storedLi.attr('data-video-id');
      cy.log(dataId);

      cy.get('.video-item__remove-button').then(($btn) => {
        $btn.click();
        cy.on('window:confirm', (text) => {
          expect(text).to.contains(DELETE_CONFIRM_MESSAGE);
        });

        cy.get('.stored-result > .video-list').should('not.be.visible');
      });
    });
  });
});
