describe("youtube classroom 레이아웃 테스트", () => {
  before(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  const KEYWORD = "javaScript";
  const MIN_NUMBER = 1;

  it("동영상 검색을 누르면 동영상 검색 모달 창이 뜬다.", () => {
    cy.get("#search-button").click();
    cy.get("#search-modal").should("be.visible");
  });

  it("저장 버튼을 누르면, 저장 취소 버튼으로 바뀐다.", () => {
    cy.get("#search-form > input").clear();
    cy.get("#search-form > input").type(KEYWORD);
    cy.get("#search-form > button").click();

    cy.get("#search-results button[data-video-id]").eq(0).click();
    cy.get("#search-results button[data-video-id]")
      .eq(0)
      .should("have.class", "d-none-hard");
    cy.get("#search-results button[data-video-id]")
      .eq(1)
      .should("not.have.class", "d-none-hard");
  });

  it("저장 취소 버튼을 누르면, 저장 버튼으로 바뀐다.", () => {
    cy.get("#search-results button[data-video-id]").eq(1).click();
    cy.get("#search-results button[data-video-id]")
      .eq(0)
      .should("not.have.class", "d-none-hard");
    cy.get("#search-results button[data-video-id]")
      .eq(1)
      .should("have.class", "d-none-hard");
  });

  it("스크롤바를 내리면, 영상을 추가로 보여준다.", () => {
    cy.get("#search-results-inner")
      .children()
      .its("length")
      .should("be.gt", MIN_NUMBER);

    cy.get("#search-results-inner")
      .then(($searchReulstInner) => {
        return $searchReulstInner.children().length;
      })
      .then((itemLen) => {
        cy.get("#skeleton-search-results").should("not.be.visible");
        cy.get("#search-results").scrollTo("bottom");
        cy.wait(1000);
        cy.get("#search-results-inner")
          .children()
          .its("length")
          .should("be.gt", itemLen);
      });
  });
});
