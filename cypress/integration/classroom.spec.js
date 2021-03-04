import state from '../../src/js/library/state.js';

describe('Youtube classroom test', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500');
  });

  it('유튜브 검색 모달에서, 검색을 하면 동영상 리스트를 불러온다.', () => {
    cy.get('#search-button').click();
    cy.get('#video-search-input').type('로이드');
    cy.get('#video-search-submit').click();
    cy.get('#video-search-result .js-video').should('have.length', 10);
  });

  it('검색한 영상의 저장 버튼을 누르면 볼 영상 리스트에 추가된다.', () => {
    cy.get('#to-watch-video-display-button').click();
    cy.get('#video-list').then(([element]) => {
      const videoCount = element.querySelectorAll('.js-video').length ?? 0;

      cy.get('#search-button').click();
      cy.get('#video-search-input').type('로이드');
      cy.get('#video-search-submit').click();
      cy.get('.js-save-button').eq(0).click();
      cy.get('#modal-close-button').click();
      cy.get('#search-button').click();
      cy.get('#video-list .js-video').should('have.length', videoCount + 1);
    });
  });

  it('이미 저장된 영상은 검색결과에서 저장 버튼이 나타나지 않는다.', () => {
    cy.get('#search-button').click();
    cy.get('#video-search-input').type('로이드');
    cy.get('#video-search-submit').click();
    cy.get('.js-save-button').eq(0).click();
    cy.get('.js-save-button').eq(0).should('not.be.visible');

    cy.get('#video-search-input').clear();
    cy.get('#video-search-input').type('로이드');
    cy.get('#video-search-submit').click();
    cy.get('.js-save-button').eq(0).should('not.be.visible');
  });

  it('결과 노출 전까지 skeleton UI를 보여준다.', () => {
    cy.get('#search-button').click();
    cy.get('#video-search-input').type('로이드');
    cy.get('#video-search-submit').click();
    cy.get('#video-search-result .skeleton').should('be.exist');
  });

  it('결과가 없을 경우, 결과 없음 이미지를 보여준다.', () => {
    cy.get('#search-button').click();
    cy.get('#video-search-input').type('||||||||||');
    cy.get('#video-search-submit').click();
    cy.get('#video-not-found').should('be.exist');
  });

  it('스크롤 시, 추가로 동영상 리스트 10개를 보여준다.', () => {
    cy.get('#search-button').click();
    cy.get('#video-search-input').type('로이드');
    cy.get('#video-search-submit').click();
    cy.get('.modal-inner').scrollTo('bottom');
    cy.get('#video-search-modal .video-wrapper').should('have.length', 2);
  });

  it('저장 가능한 최대 동영상 갯수는 100개이다.', () => {
    // api 호출의 한계로 테스트를 할 때는, MAX_SAVE_COUNT는 1로 설정 후 테스트를 진행한다.
    const alertStub = cy.stub();

    cy.get('#search-button').click();
    cy.get('#video-search-input').type('로이드');
    cy.get('#video-search-submit').click();
    cy.get('.js-save-button').eq(0).click();
    cy.get('.js-save-button').eq(1).click();

    cy.on('window:alert', alertStub).then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(
        '최대 저장 개수는 100개입니다.'
      );
    });
  });

  it('최근 검색 키워드를 3개까지 화면상에 검색창 하단에 보여준다', () => {
    cy.get('#search-button').click();
    cy.get('#video-search-input').type('로이드1');
    cy.get('#video-search-submit').click();
    cy.get('#video-search-input').clear();
    cy.get('#video-search-input').type('로이드2');
    cy.get('#video-search-submit').click();
    cy.get('#video-search-input').clear();
    cy.get('#video-search-input').type('로이드3');
    cy.get('#video-search-submit').click();
    cy.get('#video-search-input').clear();
    cy.get('#video-search-input').type('로이드2');
    cy.get('#video-search-submit').click();

    cy.get('.js-latest-keyword').then(elements => {
      expect(elements.length).to.equal(3);
      expect(elements[0].innerText).to.equal('로이드2');
      expect(elements[1].innerText).to.equal('로이드3');
      expect(elements[2].innerText).to.equal('로이드1');
    });
  });

  it('검색 모달에 다시 접근했을 때, 가장 마지막에 검색한 키워드로 검색한 결과를 보여준다.', () => {
    cy.get('#search-button').click();
    cy.get('#video-search-input').type('로이드1');
    cy.get('#video-search-submit').click();
    cy.reload();
    cy.get('#search-button').click();
    cy.get('#video-search-result .video').should('have.length', 10);
  });
});
