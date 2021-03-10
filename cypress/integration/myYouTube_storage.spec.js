// WARN: 아래 테스트 코드는 mock data를 사용해야 한다.
describe('simba-tube', () => {
  const setLocalStorage = (array) => {
    cy.visit('http://localhost:5500/', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem('savedVideoIds', JSON.stringify(array));
      },
    });
  };

  const searchVideo = (keyword) => {
    cy.get('#search-btn').click();
    cy.get('#modal-search-input').type(keyword);
    cy.get('#modal-search-button').click();
  };

  it('저장한 동영상이 100개 이상이면 alert 창과 snackbar를 보여준다.', () => {
    setLocalStorage(Array(100).fill('mock-a1b2'));
    cy.window().then((win) => cy.stub(win, 'alert').as('windowAlert'));
    searchVideo('bts');

    cy.get('#saved-video-count').should('have.text', 100);
    cy.get('.clip-save-btn').eq(0).click();

    cy.get('@windowAlert').should(
      'be.calledWith',
      '동영상 저장은 최대 100개까지 가능합니다',
    );

    cy.get('#snackbar').should('be.visible');
    cy.get('#snackbar').should('have.text', '동영상 저장에 실패했읍니다');
  });

  it('✅ 본 영상을 체크하면 버튼의 투명도가 바뀌고, snackbar를 띄운다.', () => {
    setLocalStorage(['vRXZj0DzXIA', 'I3U0QAXeOW4', 'BS7tz2rAOSA']); // 블랙핑크 아이스크림, 데이식스 예뻤어

    cy.get(`[data-video-watched='vRXZj0DzXIA']`)
      .click()
      .then((button) => {
        cy.wrap(button).should('have.css', 'opacity', '1');
      });

    cy.get('#snackbar').should('be.visible');
    cy.get('#snackbar').should(
      'have.text',
      '동영상이 본 영상 목록에 추가되었읍니다',
    );
  });
});
