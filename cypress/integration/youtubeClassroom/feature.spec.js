describe("youtube classroom 기능 테스트", () => {
  before(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  const MIN_NUMBER = 1;

  function searchKeyword(keyword) {
    cy.get("#search-form > input").clear();
    cy.get("#search-form > input").type(keyword);
    cy.get("#search-form > button").click();
  }

  it("검색어를 입력하면 영상을 가져온다.", () => {
    cy.get("#search-button").click();

    searchKeyword("JavaScript");
    cy.get("#search-results-inner")
      .children()
      .its("length")
      .should("be.gt", MIN_NUMBER);
    cy.get("#skeleton-search-results").should("not.be.visible");
  });

  it("최근 검색어는 최대 3개까지 보여준다.", () => {
    searchKeyword("TypeScript");
    searchKeyword("C++");
    searchKeyword("JAVA");
    searchKeyword("JavaScript");
    cy.get("#keyword-history").children().should("have.length", 3);
  });

  it("최근 검색어는 중복된 단어가 없다.", () => {
    searchKeyword("JavaScript");

    cy.get("#keyword-history > li > a > div")
      .eq(0)
      .should("have.text", "JavaScript");
    cy.get("#keyword-history > li > a > div").each(
      ($keyword, i, collection) => {
        expect(Array.from(collection).slice(i).includes($keyword)).to.be.false;
      }
    );
  });

  it("검색 결과가 없는 검색어를 입력하면, not-found 이미지를 보여준다.", () => {
    cy.get("#search-form > input").clear();
    cy.get("#search-form > input").type(
      "sajdsajdjkasbdkjabsjdbaskjdbkajsdbdajsdnl"
    );
    cy.get("#search-form > button").click();
    cy.get("#not-found").should("be.visible");
  });
});
