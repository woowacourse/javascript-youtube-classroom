// before(() => {
//   cy.visit("./index.html");
// });

it("메인 화면에서 검색 버튼을 누르면 검색 모달창이 나타난다.", () => {
  cy.visit("./index.html");

  cy.get("#search-modal-button").click();

  cy.get(".modal-container").should("be.visible");
});

it("데이터를 불러오는 동안 skeleton UI로 보여준다.", () => {
  cy.visit("./index.html");

  cy.get("#search-modal-button").click();
  cy.get("#search-button").click();

  cy.get(".skeleton").should("be.visible");
});

it("검색 결과가 없는 경우 결과 없음 이미지를 보여준다.", () => {
  const errorSearchKeyword = `\!\@\!\@\$\!\%\@\$\^\%\&\$\^\*\%\!\@\!\$\!\%\&\(\^\*\%\$\!\@!@$$!#@!#)_)&_%^_)&%_^)&_@!@#!#$@#$%$@#^%&$%^&#$@$^#%&$%^$^%*$^&^@#$@#$@#%@#$^#%&^**#^#$%@#$@#$^@#$!$@#%@#$%#$^#$%^$%@#$!@#!@#%)^_&)%_^$%#$%#$^#%^#%^#^&_%^_)&_#$)%_)#_$)%#_$%!@#!@$#$!#@!#)_)&_%^_)&%_^)&_%)^_&)%_^&_%^_)&_#$)%_)#_$)%#_$\%`;

  cy.visit("./index.html");

  cy.get("#search-modal-button").click();
  cy.get("#search-input-keyword").type(errorSearchKeyword);
  cy.get("#search-button").click();

  cy.get(".search-result--no-result").should("be.visible");
});

it("내가 보고 싶은 영상들을 검색할 수 있다.", () => {
  const searchKeyword = "xooos";

  cy.visit("./index.html");

  cy.get("#search-modal-button").click();
  cy.get("#search-input-keyword").type(searchKeyword);
  cy.get("#search-button")
    .click()
    .then(() => {
      cy.get(".video-item").should("be.visible");
    });
});

it("브라우저 스크롤 바를 끝까지 내려 그 다음 10개 아이템을 추가로 불러온다.", () => {
  const searchKeyword = "xooos";

  cy.visit("./index.html");

  cy.get("#search-modal-button").click();
  cy.get("#search-input-keyword").type(searchKeyword);
  cy.get("#search-button").click();
  cy.get(".video-item").should("be.visible");
  cy.get(".video-list").scrollTo("bottom");

  cy.get(".video-list").children().should("have.length", 20);
});

it("내가 검색한 영상들 중 저장 버튼을 누르면 저장 버튼이 사라진다.", () => {
  const searchKeyword = "xooos";
  cy.visit("./index.html");

  cy.get("#search-modal-button").click();
  cy.get("#search-input-keyword").type(searchKeyword);
  cy.get("#search-button").click();

  cy.get(".video-item__save-button").eq(0).click();
  cy.get(".video-item__save-button").eq(0).should("be.not.visible");
});

it("이미 저장된 영상이라면 저장 버튼이 보이지 않도록 한다.", () => {
  const searchKeyword = "xooos";
  cy.visit("./index.html");

  cy.get("#search-modal-button").click();
  cy.get("#search-input-keyword").type(searchKeyword);
  cy.get("#search-button").click();
  cy.get(".video-item__save-button").eq(0).click();

  cy.visit("./index.html");

  cy.get("#search-modal-button").click();
  cy.get("#search-input-keyword").type(searchKeyword);
  cy.get("#search-button").click();
  cy.get(".video-item__save-button").eq(0).should("be.not.visible");
});
