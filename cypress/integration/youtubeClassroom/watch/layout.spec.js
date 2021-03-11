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

  it("선택된 볼 영상, 본 영상 버튼의 색깔이 바뀐다.", () => {
    cy.get("#watch-later-button").click();
    cy.get("#watched-button").should("not.have.class", "bg-cyan-100");
    cy.get("#watch-later-button").should("have.class", "bg-cyan-100");

    cy.get("#watched-button").click();
    cy.get("#watch-later-button").should("not.have.class", "bg-cyan-100");
    cy.get("#watched-button").should("have.class", "bg-cyan-100");
  });

  it("저장버튼을 누르면 볼 영상에 추가된다.", () => {
    cy.get("#search-button").click();
    cy.get("#search-form > input").type("javascript");
    cy.get("#search-form > button").click();

    cy.get("#search-results button[data-video-id]")
      .eq(0)
      .click()
      .then(([$clickedButton]) => {
        console.log($clickedButton);
        return $clickedButton.dataset.videoId;
      })
      .then((savedVideoId) => {
        cy.get("#search-modal-close").click();
        cy.get("#watch-later-videos").children().should("have.length", 1);
        cy.get("#watch-later-videos > article button")
          .eq(0)
          .then(([$watchedButton]) => {
            expect($watchedButton.dataset.watchedButton).to.eq(savedVideoId);
          });
      });
  });
});
