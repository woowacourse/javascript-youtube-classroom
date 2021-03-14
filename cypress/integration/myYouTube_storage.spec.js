// WARN: 아래 테스트 코드는 mock data를 사용해야 한다.
describe('simba-tube', () => {
  const setVideoIds = (key, items) => {
    cy.visit('http://localhost:5500/', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem(key, JSON.stringify(items));
      },
    });
  };

  const searchVideo = (keyword) => {
    cy.get('#search-btn').click();
    cy.get('#modal-search-input').type(keyword);
    cy.get('#modal-search-button').click();
  };

  const popSnackbar = (message) => {
    cy.get('.snackbar').last().should('be.visible');
    cy.get('.snackbar').last().should('have.text', message);
  };

  it('저장한 동영상이 100개 이상이면 alert 창과 snackbar를 보여준다.', () => {
    setVideoIds('savedVideoIds', Array(100).fill('mock-a1b2'));
    cy.window().then((win) => cy.stub(win, 'alert').as('windowAlert'));
    searchVideo('bts');

    cy.get('#saved-video-count').should('have.text', 100);
    cy.get('.clip-save-btn').eq(0).click();

    cy.get('@windowAlert').should(
      'be.calledWith',
      '동영상 저장은 최대 100개까지 가능합니다',
    );

    popSnackbar('동영상 저장에 실패했읍니다');
  });

  it('✅ 본 영상을 체크하면 볼 목록에서 해당 영상이 사라지고, 본 영상 목록에 추가된다. snackbar를 띄운다.', () => {
    const storageItems = ['vRXZj0DzXIA', 'I3U0QAXeOW4', 'BS7tz2rAOSA'];
    setVideoIds('savedVideoIds', storageItems);

    cy.get(`[data-video-watched='vRXZj0DzXIA']`).click();
    cy.get(`[data-article='vRXZj0DzXIA']`).should('not.be.visible');

    popSnackbar('동영상을 본 영상 목록에 추가했읍니다');

    cy.get('#watched-btn').click();
    cy.get(`[data-article='vRXZj0DzXIA']`).should('be.visible');
  });

  it('👍 좋아요 버튼을 클릭하면 좋아요 탭에서 해당 동영상을 보여주고, 다시 클릭하면 좋아요 탭에서 해당 동영상을 삭제한다. snackbar를 띄운다.', () => {
    const storageItems = ['vRXZj0DzXIA', 'I3U0QAXeOW4', 'BS7tz2rAOSA'];
    setVideoIds('savedVideoIds', storageItems);

    cy.get(`[data-video-like='vRXZj0DzXIA']`).click();
    popSnackbar('동영상을 좋아요 목록에 추가했읍니다');

    cy.get('#liked-btn').click();
    cy.get(`[data-article='vRXZj0DzXIA']`).should('be.visible');

    cy.get(`[data-video-like='vRXZj0DzXIA']`).click();
    popSnackbar('동영상을 좋아요 목록에서 제거했읍니다');
    cy.get(`[data-article='vRXZj0DzXIA']`).should('not.be.visible');
  });

  it('🗑️ 버튼 클릭 시 사용자에게 정말 삭제할 것인지 물어보는 alert가 나오고, 동의 시 snackbar를 띄운다.', () => {
    setSavedVideoIds(['vRXZj0DzXIA', 'I3U0QAXeOW4', 'BS7tz2rAOSA']);

    const confirmStub = cy.stub();
    cy.on('window:confirm', confirmStub);

    cy.get(`[data-video-delete='vRXZj0DzXIA']`)
      .click()
      .then(() => {
        expect(confirmStub.getCall(0)).to.be.calledWith(
          '동영상을 삭제하시겠읍니까?',
        );
      });

    cy.on('window:confirm', () => true);
    popSnackbar('동영상이 삭제되었읍니다');
  });
});
