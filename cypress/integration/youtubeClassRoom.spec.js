describe("lotto 미션 테스트", () => {
  before(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  it("동영상 검색을 누르면 동영상 검색 모달 창이 뜬다.", () => {
    cy.get("#search-button").click();
    cy.get("#search-modal").should("be.visible");
  });

  it("검색어를 입력하면 영상을 가져온다.", () => {
    cy.get("#search-form > input").type("졸려");
    cy.get("#search-form > button").click();
    cy.get("#search-results").children().should("have.length", 10);
    cy.get("#skeleton-search-results").should("not.be.visible");
  });

  it("저장버튼을 누르면, 저장버튼이 사라진다.", () => {
    cy.get("#search-results button[data-video-id]").eq(0).click();
    cy.get("#search-results button[data-video-id]")
      .eq(0)
      .should("not.be.visible");
  });

  it("최근 검색어는 최대 3개까지 보여준다.", () => {
    cy.get("#search-form > input").clear();
    cy.get("#search-form > input").type("아리랑");
    cy.get("#search-form > button").click();
    cy.get("#search-form > input").clear();
    cy.get("#search-form > input").type("아라리요");
    cy.get("#search-form > button").click();
    cy.get("#search-form > input").clear();
    cy.get("#search-form > input").type("독도는");
    cy.get("#search-form > button").click();
    cy.get("#search-form > input").clear();
    cy.get("#search-form > input").type("우리땅");
    cy.get("#search-form > button").click();
    cy.get("#keyword-history").children().should("have.length", 3);
  });

  it("최근 검색어는 중복된 단어가 없다.", () => {
    cy.get("#search-form > input").clear();
    cy.get("#search-form > input").type("우리땅");
    cy.get("#keyword-history > li > a").eq(0).should("have.text", "우리땅");

    cy.get("#keyword-history > li > a").each(($keyword, i, collection) => {
      expect(Array.from(collection).slice(i).includes($keyword)).to.be.false;
    });
  });

  it("없는 검색어를 입력하면, not-found 이미지를 보여준다.", () => {
    cy.get("#search-form > input").clear();
    cy.get("#search-form > input").type(
      "sajdsajdjkasbdkjabsjdbaskjdbkajsdbdajsdnl"
    );
    cy.get("#search-form > button").click();
    cy.get("#not-found").should("be.visible");
  });

  // TODO : 403에러로 테스트 다시 해볼 필요 있음.
  it("스크롤바를 내리면, 10개의 아이템을 추가로 보여준다..", () => {
    cy.get("#search-form > input").clear();
    cy.get("#search-form > input").type("졸려");
    cy.get("#search-form > button").click();
    cy.get("#search-results").children().should("have.length", 10);
    cy.get("#skeleton-search-results").should("not.be.visible");
    cy.get("#search-results").scrollTo("bottom");
    cy.get("#search-results").children().should("have.length", 20);
  });
});
