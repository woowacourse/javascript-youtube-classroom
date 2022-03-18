import { LOCALSTORAGE_KEY_SAVE } from '../../src/js/constant';
import { setLocalStorage } from '../../src/js/domain/localStorage';

describe('메인페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('dist/index.html');
  });

  it('저장된 영상이 없을시 저장된 영상이 없다는 메시지를 보여준다.', () => {
    cy.get('.no-saved-videos').should('be.visible');
  });

  it('사용자가 저장한 영상이 있을시 볼영상에서 확인할수 있다.', () => {
    const inputValue = 'jasmin';

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(inputValue);
    cy.get('#search-button').click();
    cy.get('.video-item__save-button').eq(0).click();

    cy.get('.dimmer').click({ force: true });
    cy.get('.video-item').should('be.visible');
  });

  it('볼 영상, 본 영상을 필터링 할수 있다.', () => {
    cy.get('#watched-video-button')
      .click()
      .then(() => {
        cy.get('.after-watch-video-list').should('be.hidden');
        cy.get('.watched-video-list').should('be.visible');
      });
  });

  it('저장한 영상에서 ✅ 클릭시 본영상으로 이동한다.', () => {
    const inputValue = 'jasmin';

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(inputValue);
    cy.get('#search-button').click();
    cy.get('.video-item__save-button').eq(0).click();

    cy.get('.dimmer').click({ force: true });

    cy.get('.watch-video-button').click();
    cy.get('#watched-video-button')
      .click()
      .then(() => {
        cy.get('.watched-video-list').should(($item) => expect($item).to.have.length(1));
      });
  });

  it('저장된 영상에서 🗑️ 클릭시 영상을 삭제할수 있다.', () => {
    const confirmStub = cy.stub();
    cy.on('window:confirm', confirmStub);

    const inputValue = 'jasmin';

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(inputValue);
    cy.get('#search-button').click();
    cy.get('.video-item__save-button').eq(0).click();
    cy.get('.video-item__save-button').eq(1).click();

    cy.get('.dimmer').click({ force: true });

    cy.get('.delete-watch-video-button')
      .eq(0)
      .click()
      .then(() => {
        expect(confirmStub).to.be.called;
      });

    cy.get('.video-item').should(($item) => expect($item).to.have.length(1));
  });

  it('본 영상에서 👁️ 클릭시 볼 영상으로 다시 이동한다.', () => {
    const inputValue = 'jasmin';

    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(inputValue);
    cy.get('#search-button').click();
    cy.get('.video-item__save-button').eq(0).click();

    cy.get('.dimmer').click({ force: true });

    cy.get('.watch-video-button').click();
    cy.get('#watched-video-button').click();

    cy.get('.after-watch-video-button')
      .click()
      .then(() => {
        cy.get('.after-watch-video-list').should(($item) => expect($item).to.have.length(1));
      });
  });
});
