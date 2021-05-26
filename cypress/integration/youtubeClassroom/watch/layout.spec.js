describe("youtube classroom 레이아웃 테스트", () => {
  before(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  it("최초 프로그램 실행하면, 볼 영상이 없다는 이미지를 보여준다.", () => {
    cy.get("#not-saved").should("be.visible");
  });

  it("최초 프로그램 실행하면, 본 영상이 없다는 이미지를 보여준다.", () => {
    cy.get("#watched-view-button").click();
    cy.get("#not-watched").should("be.visible");
  });

  it("최초 프로그램 실행하면, 좋아요 영상이 없다는 이미지를 보여준다.", () => {
    cy.get("#liked-view-button").click();
    cy.get("#not-liked").should("be.visible");
  });

  it("선택된 볼 영상, 본 영상, 좋아요 영상 버튼의 색깔이 바뀐다.", () => {
    cy.get("#watch-later-view-button").click();
    cy.get("#watched-view-button").should("not.have.class", "bg-cyan-100");
    cy.get("#watch-later-view-button").should("have.class", "bg-cyan-100");
    cy.get("#liked-view-button").should("not.have.class", "bg-cyan-100");

    cy.get("#watched-view-button").click();
    cy.get("#watch-later-view-button").should("not.have.class", "bg-cyan-100");
    cy.get("#watched-view-button").should("have.class", "bg-cyan-100");
    cy.get("#liked-view-button").should("not.have.class", "bg-cyan-100");

    cy.get("#liked-view-button").click();
    cy.get("#watch-later-view-button").should("not.have.class", "bg-cyan-100");
    cy.get("#watched-view-button").should("not.have.class", "bg-cyan-100");
    cy.get("#liked-view-button").should("have.class", "bg-cyan-100");
  });
});
