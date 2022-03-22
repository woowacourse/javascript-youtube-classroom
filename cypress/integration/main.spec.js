import { MESSAGE } from '../../src/js/constants.js';

const URL = 'http://localhost:9000';

describe('모달 기능 테스트', () => {
  before(() => {
    cy.visit(URL);
  });
  it('검색 버튼을 클릭하면 모달을 볼 수 있다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('#modal').should('be.visible');
  });

  it('모달 바깥 영역을 클릭하면 모달을 닫는다.', () => {
    cy.get('.dimmer').click({ force: true });
    cy.get('#modal').should('not.be.visible');
  });
});

describe('본 영상 / 볼 영상 저장 및 삭제 기능 테스트', () => {
  before(() => {
    cy.visit(URL);
  });
  it('가장 처음에는 저장된 영상이 없으므로, 비어있다는 것을 사용자에게 알려주는 상태를 보여준다.', () => {
    cy.get('.no-save__image').should('be.visible');
  });

  it('영상 카드의 이모지 버튼을 클릭하여 상태 변경이 가능해야 한다. - ✅ 를 누르면 본/볼 영상으로 토글', () => {
    cy.saveFirstVideo('javascript');
    cy.closeModal();

    cy.get('#saved-video-list').children().should('have.length', 1);

    cy.get('#toggle-watched-button').click();
    cy.get('.no-save__image').should('be.visible');

    cy.get('#watched-list-button').click();
    cy.get('#saved-video-list').children().should('have.length', 1);
    cy.get('#toggle-watched-button').click();
    cy.get('.no-save__image').should('be.visible');

    cy.get('#watch-later-list-button').click();
    cy.get('#saved-video-list').children().should('have.length', 1);
  });

  it('영상 카드의 이모지 버튼을 클릭하여 상태 변경이 가능해야 한다. - 🗑️ 버튼을 누르면 사용자에게 정말 삭제할 것인지 물어본 후, 삭제한다', () => {
    cy.get('#remove-video-button').click();
    cy.on('window:confirm', message => expect(message).to.eq(MESSAGE.CONFIRM_REMOVE_VIDEO));
    cy.get('.no-save__image').should('be.visible');
  });
});
