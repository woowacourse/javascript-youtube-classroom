import { MESSAGE } from '../../src/js/constants';

describe('UI 정상 동작 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
  });

  afterEach(() => {
    cy.reload();
  });

  it('메인에서 검색 버튼 클릭 시 검색 모달이 보여진다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('.modal-container').then(element => {
      expect(element).not.to.have.class('hide');
    });
  });

  it('모달 바깥 클릭 시 검색 모달이 사라진다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('.dimmer').click({ force: true });
    cy.get('.modal-container').then(element => {
      expect(element).to.have.class('hide');
    });
  });

  it('검색어를 입력하지 않았을 경우 스낵바를 띄운다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-button').click();
    cy.get('#snack-bar').then(element => {
      expect(element).to.have.text(MESSAGE.ERROR_BLANK_SEARCH_INPUT);
      expect(element).to.have.class('show');
    });
  });

  it('검색 결과가 없는 검색어 입력 시 결과 없음을 알린다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type(
      'dfjkdjliehtuhgfjnbkldjfksjfielrjfhiles',
    );
    cy.get('#search-button').click();
    cy.get('.search-result').find('.no-result');
  });
});
