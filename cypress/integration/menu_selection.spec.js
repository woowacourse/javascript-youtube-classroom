/// <reference types="cypress" />

context("메뉴 선택", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/javascript-youtube-classroom/");
  });

  it("초기화면에서 비디오 검색 버튼을 누르면 검색 모달창이 띄워진다.", () => {
    cy.get(".search-modal").should("not.have.class", "open");
    cy.get(".menu-section__video-search-btn").click();
    cy.get(".search-modal").should("have.class", "open");
  });
});
