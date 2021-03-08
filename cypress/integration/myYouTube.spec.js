describe('simba-tube', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
    cy.window().then((win) => cy.stub(win, 'alert').as('windowAlert'));
  });

  const searchVideo = (keyword) => {
    cy.get('#search-btn').click();
    cy.get('#modal-search-input').type(keyword);
    cy.get('#modal-search-button').click();
  };

  const interceptSearch = (keyword) => {
    cy.intercept({
      url: 'https://www.googleapis.com/youtube/v3/search',
      query: { q: keyword },
    }).as('search');
  };

  it('클릭한 탭의 색을 하이라이트한다.', () => {
    cy.get('#nav-bar > button').each((button) => {
      cy.wrap(button).click();
      cy.wrap(button).should(
        'have.css',
        'background-color',
        'rgb(179, 234, 242)',
      );
    });
  });

  it('동영상 검색 버튼을 클릭하면 모달 창이 열린다.', () => {
    cy.get('#search-btn').click();
    cy.get('.modal').should('be.visible');
  });

  it('검색 모달 창의 x 버튼을 누르면 검색 모달 창이 닫히고, 볼 영상 목록으로 돌아간다.', () => {
    cy.get('#search-btn').click();
    cy.get('.modal-close').click();
    cy.get('.modal').should('not.be.visible');
    cy.get('#saved-btn').should(
      'have.css',
      'background-color',
      'rgb(179, 234, 242)',
    );
  });

  it('현재 검색한 검색어가 최근 검색어 목록에 남는다.', () => {
    const keyword = '불닭';

    searchVideo(keyword);
    cy.get('.chip').eq(0).should('have.text', keyword);
  });

  it('youtube api에서 결과를 가져오는 동안 skeleton card UI로 로딩 화면을 보여준다.', () => {
    searchVideo('불닭');
    cy.get('.skeleton').should('be.visible');
  });

  it('검색 결과가 없는 경우 결과 없음 이미지를 보여준다. ', () => {
    const keyword = 'sadffsdasdb';

    interceptSearch(keyword);
    searchVideo(keyword);

    cy.wait('@search');
    cy.get('.not-found').should('be.visible');
  });

  it('검색 후 스크롤를 끝까지 이동시킬 경우 api 추가 요청을 통해 검색 결과를 10개씩 더 보여준다.', () => {
    const keyword = 'bts';

    interceptSearch(keyword);
    searchVideo(keyword);

    cy.wait('@search');
    cy.get('#modal-videos').scrollTo('bottom');
    cy.wait('@search');
    cy.get('#modal-videos').find('.clip').should('have.length', 20);
  });

  it('검색 결과 동영상의 저장 버튼을 누르면 저장한 동영상들을 볼 영상 목록에 보여준다.', () => {
    const keyword = 'bts';

    interceptSearch(keyword);
    searchVideo(keyword);

    cy.wait('@search');
    cy.get('.clip-save-btn').eq(0).click();

    cy.get('#saved-video-count').should('have.text', 1);
    cy.get('#main-videos').find('.clip').should('have.length', 1);
  });

  it('최근 검색어 클릭 시 해당 검색어로 검색을 한다.', () => {
    searchVideo('bts');

    cy.get('#modal-search-input').clear().type('day6');
    cy.get('#modal-search-button').click();

    cy.get('#chip-1').should('have.text', 'day6');

    cy.intercept({
      url: 'https://www.googleapis.com/youtube/v3/search',
    }).as('search');

    cy.get('#chip-2').click();

    cy.wait('@search').should(({ request }) => {
      expect(request.url).to.include('q=bts');
    });

    cy.get('#modal-search-input').should('have.value', 'bts');
    cy.get('#chip-1').should('have.text', 'bts');
  });
});
