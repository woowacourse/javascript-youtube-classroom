/// <reference types="cypress" />

context("모달을 통한 비디오 검색", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500");
  });

  it("모달창이 띄워진 상황에서, 검색 창에 검색어를 입력한 후 검색 버튼을 누르면, 검색 결과 모달에 로딩 애니메이션이 출력된다.", () => {
    cy.get(".menu-section__video-search-btn").click();
    cy.get(".search-modal__input").type("스낵랩");
    cy.get(".search-modal__btn").click();
    cy.get(".skeleton").should("be.visible");
  });
});
