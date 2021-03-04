/// <reference types="cypress" />

context("모달을 통한 비디오 검색", () => {
  describe("검색 결과가 있는 경우", () => {
    before(() => {
      cy.visit("http://127.0.0.1:5500");
    });

    it("모달창이 띄워진 상황에서, 검색 창에 검색어를 입력한 후 검색 버튼을 누르면, 검색 결과 모달에 로딩 애니메이션이 출력된다.", () => {
      cy.get(".menu-section__video-search-btn").click();
      cy.get(".search-modal__input").type("스낵랩");
      cy.get(".search-modal__btn").click();
      cy.get(".skeleton").should("be.visible");
    });

    it("데이터 로딩 중인 상태에서, 검색 결과가 존재할 경우 10개 이하의 검색 결과가 출력된다.", () => {
      cy.get(".skeleton").should("not.exist");
      cy.get(".search-modal__video-wrapper").find(".clip").its("length").should("be.lte", 10);
    });

    it("10개 이하의 검색 결과가 출력된 경우, 로딩 애니메이션이 사라진다.", () => {
      cy.get(".skeleton").should("not.exist");
    });
  });

  describe("검색 결과가 없는 경우", () => {});
});
