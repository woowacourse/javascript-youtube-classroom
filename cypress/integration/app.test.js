import { MESSAGE, STORAGE_KEY } from '../../src/js/constants';
import { video } from '../../src/js/domain/video';

describe('동영상 검색, 저장, 삭제 UI를 테스트한다.', () => {
  before(() => {
    cy.visit('http://localhost:9000/');
  });

  it('메인에서 검색 버튼을 클릭하면 검색 모달이 열린다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('.modal-container').then(element => {
      expect(element).not.to.have.class('hide');
    });
  });

  it('검색 모달에서 검색어를 입력하지 않으면 검색어를 입력하라는 문구가 출력된다.', () => {
    cy.get('#search-button').click();
    cy.get('#search-input-keyword').then(
      $searchInputKeyword => expect($searchInputKeyword[0].checkValidity()).to.be.false,
    );
  });
  it('검색 모달에서 검색 결과가 없는 검색어를 입력하면 검색 결과 없음 이미지가 출력된다.', () => {
    cy.get('#search-input-keyword').type('꿿휅뛹삙뽥');
    cy.get('#search-button').click();
    cy.get('.search-result').find('.no-result');
  });

  it('검색 모달에서 검색 결과가 있는 검색어를 입력하면 검색 결과가 출력된다.', () => {
    cy.get('#search-input-keyword').clear();
    cy.get('#search-input-keyword').type('우테코');
    cy.get('#search-button').click();
    cy.get('.video-list').find('.video-item');
  });

  it('저장 버튼을 누르면 동영상이 저장되고, 저장 완료 스낵바를 보여준다.', () => {
    cy.get('.video-item__save-button').first().click();
    cy.get('#snack-bar').then(element => {
      expect(element).to.have.text(MESSAGE.SAVE_SUCCESS);
      expect(video.getVideoList().length).equal(1);
      expect(element).to.have.class('show');
    });
  });

  it('모달 바깥 부분을 누르면 모달창이 닫힌다.', () => {
    cy.get('.dimmer').click({ force: true });
    cy.get('.modal-container').then(element => {
      expect(element).to.have.class('hide');
    });
  });

  it('삭제 버튼을 누르면 동영상이 삭제되고, 삭제 완료 스낵바를 보여준다.', () => {
    cy.get('.video-item__remove-button').first().click();
    cy.get('.empty-result').find('.empty-result__description');
    cy.get('#snack-bar').then(element => {
      expect(element).to.have.text(MESSAGE.REMOVE_SUCCESS);
      expect(video.getVideoList()[0]).equal(undefined);
      expect(element).to.have.class('show');
    });
  });
});
