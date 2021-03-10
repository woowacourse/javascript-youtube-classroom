import { MESSAGE } from '../../src/js/utils/constant.js';
import { setLocalDummy } from './dummy.js';

describe('나만의 유튜브 강의실 메인 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage('savedClips');
    setLocalDummy();
  });

  it('페이지 접속시 기본 메인화면이 "볼 영상"인지 테스트한다. ', () => {
    cy.get('.bg-cyan-100').should('have.text', '👁️ 볼 영상');
  });

  it('저장한 동영상이 없을 경우 "동영상 없음"을 표시하는 상태를 보여주는지 테스트한다.', () => {
    cy.get('[data-js="saved-page__not-found"]').should('be.visible');
  });

  it('영상 카드의 ✅ 버튼 클릭시, 볼 영상의 상태가 본 영상으로 변경되는지 테스트한다.', () => {
    cy.reload();
    cy.get('[data-js="saved-clip-button-container__check"]').click();
    cy.get('[data-js="navigator__watched-button"]').click();
    cy.get('[data-js="saved-page__clip"]').shoulde('be.visible');
  });

  it('영상 카드의 ✅ 버튼 클릭시, 본 영상의 상태가 볼 영상으로 변경되는지 테스트한다.', () => {
    cy.reload();
    cy.get('[data-js="navigator__watched-button"]').click();
    cy.get('[data-js="saved-clip-button-container__check"]').click();
    cy.get('[data-js="navigator__unwatched-button"]').click();
    cy.get('[data-js="saved-page__clip"]').shoulde('be.visible');
  });

  it('영상 카드의 🗑️ 버튼 클릭시, 저장된 리스트에서 영상이 삭제되는지 테스트한다.', () => {
    const stub = cy.stub();
    cy.on('window:confirm', stub);
    cy.reload();
    cy.get('[data-js="saved-clip-button-container__delete"]')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(MESSAGE.CONFIRM.DELETE_CLIP);
      });
    cy.get('[data-js="saved-page__clip"]').shoulde('not.be.visible');
  });
});
