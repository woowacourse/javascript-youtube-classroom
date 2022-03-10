describe("보고싶은 영상 찾기 모달창 전체 로직 테스트", () => {
  before(() => {
    cy.visit("./index.html");
  });

  const searchKeyword = "xooos";
  const errorSearchKeyword = `\!\@\!\@\$\!\%\@\$\^\%\&\$\^\*\%\!\@\!\$\!\%\&\(\^\*\%\$\!\@!@$$!#@!#)_)&_%^_)&%_^)&_@!@#!#$@#$%$@#^%&$%^&#$@$^#%&$%^$^%*$^&^@#$@#$@#%@#$^#%&^**#^#$%@#$@#$^@#$!$@#%@#$%#$^#$%^$%@#$!@#!@#%)^_&)%_^$%#$%#$^#%^#%^#^&_%^_)&_#$)%_)#_$)%#_$%!@#!@$#$!#@!#)_)&_%^_)&%_^)&_%)^_&)%_^&_%^_)&_#$)%_)#_$)%#_$\%`;

  it("초기 화면에서 검색 버튼을 누르면 보고싶은 영상 찾기 모달창이 나타난다.", () => {
    cy.get("#search-modal-button").click();
    cy.get(".modal-container").should("be.visible");
  });

  /**
   * youtube에 검색한 결과가 없는 경우를 찾기 어려움... (테스트 통과가 되지 않을 확률이 높다.)
   */
  // it("보고싶은 영상 찾기 모달창 안에서 원하는 영상을 검색한 결과가 없는 경우 검색 결과 없음 이미지를 보여준다.", () => {
  //   cy.get("#search-input-keyword").type(errorSearchKeyword);
  //   cy.get("#search-button").click();
  //   cy.get(".search-result--no-result").should("be.visible");
  // });

  /**
   * 실제 API 호출 했을 경우 주석을 제거 후 테스트를 돌려주세요.
   */
  // it("보고싶은 영상 찾기 모달창 안에서 검색된 영상을 불러오는 동안 로딩 이미지를 보여준다.", () => {
  //   cy.get("#search-input-keyword").clear().type(searchKeyword);
  //   cy.get("#search-button").click();
  //   cy.get(".skeleton").should("be.visible");
  // });

  it("보고싶은 영상 찾기 모달창 안에서 원하는 영상을 검색할 수 있다.", () => {
    cy.get("#search-input-keyword").clear().type(searchKeyword);
    cy.get("#search-button").click();
    cy.get(".video-item").should("be.visible");
  });

  it("보고싶은 영상 찾기 모달창 안에서 검색된 영상의 저장 버튼을 누르면 저장 버튼은 보이지 않아야 한다.", () => {
    cy.get(".video-item__save-button").eq(0).click();
    cy.get(".video-item__save-button").eq(0).should("be.not.visible");
  });

  it("보고싶은 영상 찾기 모달창 안에서 검색 결과 영역 스크롤 바를 끝까지 내리면 새로운 영상 10개를 추가로 사용자에게 보여준다.", () => {
    cy.get(".video-list").scrollTo("bottom");
    cy.get(".video-list").children().should("have.length", 20);
  });

  it("보고싶은 영상 찾기 모달창 안에서 검색된 영상이 이미 저장된 영상이라면 저장 버튼이 보이지 않아야 한다.", () => {
    cy.get("#search-button").click();
    cy.get(".video-item__save-button").eq(0).should("be.not.visible");
  });

  it("보고싶은 영상 찾기 모달창이 열린 상태에서 모달창 뒤의 음영 된 부분을 누르면 모달창이 사라진다.", () => {
    cy.get(".dimmer").click({ force: true });
    cy.get(".modal-container").should("be.not.visible");
  });
});
