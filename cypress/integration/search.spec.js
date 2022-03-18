import { MESSAGE } from '../../src/js/constants.js';
const URL = 'http://localhost:9000';

describe('검색 기능 테스트', () => {
  before(() => {
    cy.visit(URL);
  });
  it('검색어의 길이가 0이라면 사용자에게 alert로 알려준다.', () => {
    cy.searchKeyword(' ');
    cy.checkAlertMessage(MESSAGE.EMPTY_SEARCH_KEYWORD);
  });

  it('검색을 완료하면 10개의 데이터를 그려준다.', () => {
    cy.inputKeyword('javascript');
    cy.get('.list-item').should('have.length', 10);
  });

  it('동영상을 저장하면, 저장 버튼을 볼 수 없다.', () => {
    cy.get('.list-item__save-button').first().click();
    cy.get('.list-item__save-button').first().should('not.be.visible');
  });

  it('검색 결과가 없을 경우 안내 이미지를 볼 수 있다.', () => {
    cy.inputKeyword('ddkjfkdjfkdjkfjkdjkfjkdjfkjdkfjkdlslk');
    cy.get('.no-result__image').should('be.visible');
  });
});
