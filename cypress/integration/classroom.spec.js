describe('나만의 유튜브 강의실 Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('동영상 검색 버튼을 눌렀을 때, 유튜브 검색 modal이 나타난다.', () => {
    cy.get('#search-button').click();
    cy.get('.modal').should('be.visible');
  });

  it('modal이 나타난 상태에서, dimmer나 닫기 버튼을 누르면, modal이 사라진다.', () => {
    cy.get('#search-button').click();
    cy.get('.modal-close').click();
    cy.get('.modal').should('be.not.visible');

    cy.get('#search-button').click();
    cy.get('.modal').click('topLeft');
    cy.get('.modal').should('be.not.visible');
  });

  it('유튜브 검색 modal에서 검색어를 입력하고 검색 버튼을 누르면, 검색 결과를 10개까지 보여준다.', () => {
    cy.get('#search-button').click();
    cy.get('#youtube-search-keyword-input').type('BTS');
    cy.get('#youtube-search-form').submit();
    cy.get('.modal .video-wrapper .clip').should('have.length', 10);
  });

  it('검색어가 비어있는 상태에서 검색 버튼을 누르면, 스낵바 경고 메시지가 나타난다.', () => {
    cy.get('#search-button').click();
    cy.get('#youtube-search-form').submit();
    cy.get('#snackbar').should('be.visible').should('have.text', '검색어를 입력해주세요.');
  });

  it('유튜브 검색 modal에서 검색 결과 스크롤 바를 끝까지 이동시켰을 경우, 그 다음 10개의 검색 결과를 추가로 보여준다.', () => {
    cy.get('#search-button').click();
    cy.get('#youtube-search-keyword-input').type('BTS');
    cy.get('#youtube-search-form').submit();
    cy.get('.modal').scrollTo('bottom');
    cy.get('.modal .video-wrapper .clip').should('have.length', 20);
  });

  it('검색한 검색어는 최근 검색어에 추가된다.', () => {
    const keyword = 'BTS';
    cy.get('#search-button').click();
    cy.get('#youtube-search-keyword-input').type(keyword);
    cy.get('#youtube-search-form').submit();
    cy.get('.chip').first().should('have.text', keyword);
  });

  it('각 검색 결과 동영상의 저장 버튼을 누르면 볼 영상 목록의 마지막에 저장한 동영상이 추가된다.', () => {
    const keyword = 'BTS';
    cy.get('#search-button').click();
    cy.get('#youtube-search-keyword-input').type(keyword);
    cy.get('#youtube-search-form').submit();
    cy.get('.modal .btn-save').first().click();

    cy.get('.modal .clip .content-container h3')
      .first()
      .then(($title) => {
        const title = $title.text();
        cy.get('main .content-container h3').last().should('have.text', title);
      });
  });

  // TODO: 동영상 추가 기능 구현 후 동영상 100개 저장하는 로직 추가하기
  it('저장된 동영상이 100개 이상일 경우, 스낵바 경고 메시지가 나타난다.', () => {
    cy.get('main .video-wrapper .clip').should('have.length', 100);
    cy.get('#snackbar').should('be.visible').should('have.text', '동영상은 최대 100개까지 저장할 수 있습니다.');
  });
});
