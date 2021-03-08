// WARN: 아래 테스트 코드는 mock data를 사용해야 한다.
describe('simba-tube', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem(
          'savedVideoIds',
          Array(100).fill('mock-a1b2'),
        );
      },
    });
    cy.window().then((win) => cy.stub(win, 'alert').as('windowAlert'));
  });

  const searchVideo = (keyword) => {
    cy.get('#search-btn').click();
    cy.get('#modal-search-input').type(keyword);
    cy.get('#modal-search-button').click();
  };

  it('저장한 동영상이 100개 이상이면 alert 창을 보여준다.', () => {
    searchVideo('bts');

    cy.get('#saved-video-count').should('have.text', 100);
    cy.get('.clip-save-btn').eq(0).click();

    cy.get('@windowAlert').should(
      'be.calledWith',
      '동영상 저장은 최대 100개까지 가능합니다',
    );
  });
});
