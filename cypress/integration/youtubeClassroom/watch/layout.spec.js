describe("youtube classroom 기능 테스트", () => {
  before(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  it("최초 프로그램 실행하면, 볼 영상이 없다는 이미지를 보여준다.", () => {
    cy.get("#not-saved").should("be.visible");
  });

  it("최초 프로그램 실행하면, 본 영상이 없다는 이미지를 보여준다.", () => {
    cy.get("#watched-button").click();
    cy.get("#not-watched").should("be.visible");
  });
});
