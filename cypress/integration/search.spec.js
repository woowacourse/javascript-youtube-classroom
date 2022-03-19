import { MESSAGE, VIDEO } from '../../src/js/constants/constants.js';

describe('유튜브 동영상 검색 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000');
  });

  it('검색 버튼을 클릭하면 검색 모달창을 볼 수 있다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('.modal-container').should('be.visible');
  });

  it('검색 값이 빈값이면, 에러 메시지를 보여준다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    cy.searchKeyword(' ').then(() => {
      expect(alertStub).to.be.calledWith(MESSAGE.ERROR.EMPTY_INPUT);
    });
  });

  it('정상적인 검색을 하면, 10개의 데이터를 보여준다.', () => {
    cy.searchKeyword('우테코');
    cy.get('.video-list').children().should('have.length', VIDEO.SEARCH_RESULT_COUNT);
  });

  it('검색 결과가 없을 경우 결과 없음 이미지를 보여준다.', () => {
    cy.searchKeyword('뷃꿥');
    cy.get('.no-result__image').should('be.visible');
  });

  it('검색한 동영상에서 저장버튼을 누르면, 저장 버튼을 볼 수 없다.', () => {
    cy.searchKeyword('우테코');
    cy.get('.video-item__save-button').eq(0).click();
    cy.get('.video-item__save-button').eq(0).should('not.be.visible');
  });
});
