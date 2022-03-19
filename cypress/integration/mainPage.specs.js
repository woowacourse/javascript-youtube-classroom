import { getLocalStorage } from '../../src/js/domain/localStorage';

describe('메인 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });
  describe('영상이 없는 경우', () => {
    beforeEach(() => {
      cy.visit('./index.html');
    });
    it('최초에 볼 영상에 아무것도 없는 경우 해당 이미지를 볼 수 있다.', () => {
      cy.get('#no_video--img').should('be.visible');
    });

    it('최초에 본 영상에 아무것도 없는 경우 해당 이미지를 볼 수 있다.', () => {
      cy.get('#watched-tab-menu').click();
      cy.get('#no_video--img').should('be.visible');
    });
  });
  describe('영상이 있는 경우', () => {
    const dataId = 'RjLh2rI1R3k';
    beforeEach(() => {
      cy.visit('./index.html');
      cy.get('#search-modal-button').click();
      cy.searchVideo('have-result-keyword', 'searchResult.json');
      cy.get(`[data-id="${dataId}"]`).click();
      cy.get('body').type('{esc}');
    });

    it('본 영상이 존재하는 경우 해당 리스트를 볼 수 있다.', () => {
      cy.get(`[data-video-id="${dataId}"]`).should('be.visible');
    });

    it('새로고침 해도 해당 영상이 보여진다', () => {
      cy.reload().then(() => {
        cy.wait(5000);
        cy.get(`[data-video-id="${dataId}"]`).should('be.visible');
      });
    });

    it('본 영상 중 체크를 하고 본 영상으로 넘어갔을 때 해당 비디오를 볼 수 있다.', () => {
      cy.get(`[data-video-id="${dataId}"] > div > .video-watched--btn`).click();
      cy.get('#watched-tab-menu').click();
      cy.get(`[data-video-id="${dataId}"]`).should('be.visible');
    });

    it('볼 영상에서 체크를 다시 한 번 하면 본 영상으로 돌아간다.', () => {
      cy.get(`[data-video-id="${dataId}"] > div > .video-watched--btn`).click();
      cy.get('#watched-tab-menu').click();
      cy.get(`[data-video-id="${dataId}"] > div > .video-watched--btn`).click();
      cy.get('#not-watched-tab-menu').click();
      cy.get(`[data-video-id="${dataId}"]`).should('be.visible');
    });

    it('삭제 버튼을 누르고 확인을 누르면 해당 영상이 삭제된다.', () => {
      const confirmStub = cy.stub();
      confirmStub.onFirstCall().returns(true);
      cy.get(`[data-video-id="${dataId}"] > div > .video-delete--btn`).click();
      cy.get(`[data-video-id="${dataId}"]`).should('not.exist');
    });
  });
});
