describe('볼영상, 본영상 탭을 클릭하면 각각에 맞는 영상을 확인할 수 있다.', () => {
  it('볼영상 탭을 클릭하면, 영상을 확인할 수 있다.', () => {
    cy.visit('index.html');
    //영상을 setLocalStorage에 저장한다 

    //볼 영상 탭을 클릭한다. 
    cy.get('#will-see-button').click();
    //영상이 보여진다. 
    cy.get('.is-empty').should('not.be.visible');
  });

  it('본영상 탭을 클릭하면, 영상을 확인할 수 있다.', () => {

  });
});

describe('영상을 관리할 수 있다.', () => {
  it('삭제 버튼을 클릭하면, 해당 영상은 삭제된다.', () => {

  });

  it('볼영상 탭에서 체크 버튼을 클릭하면, 해당 영상은 본영상 탭으로 이동한다.', () => {

  });

  it('본영상 탭에서 체크 버튼을 클릭하면, 해당 영상은 볼영상 탭으로 이동한다.', () => {

  });
});

//동영상 검색 -> 영상 저장 -> 사이트 새로고침(혹은 모달 닫았을 때) -> 볼 영상 길이가 1이여야한다.

it('동영상 검색 및, 영상을 저장하고 모달 창을 닫았을 때, 볼 영상 목록의 길이가 1이다.', () => {
  cy.visit('http://localhost:9000/');
  cy.get('#search-modal-button').click();
  cy.get('#search-input-keyword').type('위니');
  cy.get('#search-button').click();
  cy.get('.video-item__save-button').first().click();
  cy.get('.close-button').click();
  cy.get('#will-see-list').children().should('have.length', 1);
});