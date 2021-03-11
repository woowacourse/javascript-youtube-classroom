/// <reference types="cypress" />

context.only("저장된 비디오 관리", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500");
  });

  it("초기에 저장된 비디오가 존재하지 않는다면, 비어있다는 것을 사용자에게 알려주는 이미지를 보여준다.", () => {
    cy.get(".no-watch-later-image").should("be.visible");
  });
});
