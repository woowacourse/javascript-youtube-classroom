import { ERROR_MESSAGE } from "../../src/js/constants";

describe("보고싶은 영상 찾기 모달창 전체 로직 테스트", () => {
  const searchKeyword = "xooos";
  const errorSearchKeyword = `\!\@\!\@\$\!\%\@\$\^\%\&\$\^\*\%\!\@\!\$\!\%\&\(\^\*\%\$\!\@!@$$!#@!#)_)&_%^_)&%_^)&_@!@#!#$@#$%$@#^%&$%^&#$@$^#%&$%^$^%*$^&^@#$@#$@#%@#$^#%&^**#^#$%@#$@#$^@#$!$@#%@#$%#$^#$%^$%@#$!@#!@#%)^_&)%_^$%#$%#$^#%^#%^#^&_%^_)&_#$)%_)#_$)%#_$%!@#!@$#$!#@!#)_)&_%^_)&%_^)&_%)^_&)%_^&_%^_)&_#$)%_)#_$)%#_$\%`;

  before(() => {
    cy.visit("./index.html");
  });

  it("초기 화면에서 검색 버튼을 누르면 보고싶은 영상 찾기 모달창이 나타난다.", () => {
    cy.get("#search-modal-button").click();
    cy.get(".modal-container").should("be.visible");
  });

  it("보고싶은 영상 찾기 모달창 안에서 원하는 영상을 검색한 결과가 없는 경우 검색 결과 없음 이미지를 보여준다.", () => {
    cy.intercept(
      "https://clever-aryabhata-ff1fc1.netlify.app/youtube/v3/search?*",
      {
        fixture: "no-search",
      }
    ).as("noSearch");

    cy.searchKeyword(errorSearchKeyword);
    cy.get(".search-result--no-result").should("be.visible");
  });

  it("보고싶은 영상 찾기 모달창 안에서 검색창에 검색어를 입력하지 않으면 에러 메시지를 보여준다.", () => {
    const alertStub = cy.stub();

    cy.on("window:alert", alertStub);
    cy.get("#search-input-keyword").clear().type(" ");
    cy.get("#search-button")
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.SEARCH_INPUT_IS_EMPTY);
      });
  });

  it("보고싶은 영상 찾기 모달창 안에서 원하는 영상을 검색하면 검색된 영상을 불러오는 동안 로딩 이미지를 보여준 후 검색 결과를 보여준다.", () => {
    cy.intercept(
      "https://clever-aryabhata-ff1fc1.netlify.app/youtube/v3/search?*",
      {
        fixture: "search",
      }
    ).as("search");
    cy.searchKeyword(searchKeyword);
    // cy.get(".skeleton").should("be.visible");
    cy.get(".video-item").should("be.visible");
  });

  it("보고싶은 영상 찾기 모달창 안에서 검색된 영상의 저장 버튼을 누르면 저장 버튼은 보이지 않아야 한다.", () => {
    cy.get(".video-item__save-button").eq(0).click();
    cy.get(".video-item__save-button").eq(0).should("be.not.visible");
  });

  it("보고싶은 영상 찾기 모달창 안에서 검색 결과 영역 스크롤 바를 끝까지 내리면 새로운 영상 10개를 추가로 사용자에게 보여준다.", () => {
    cy.intercept(
      "https://clever-aryabhata-ff1fc1.netlify.app/youtube/v3/search?*",
      {
        fixture: "scroll",
      }
    ).as("scroll");

    cy.get(".video-list").scrollTo("bottom");
    cy.get(".video-list").children().should("have.length", 20);
  });

  it("보고싶은 영상 찾기 모달창이 열린 상태에서 모달창 뒤의 음영 된 부분을 누르면 모달창이 사라진다.", () => {
    cy.get(".dimmer").click({ force: true });
    cy.get(".modal-container").should("be.not.visible");
  });

  it("보고싶은 영상 찾기 모달창 안에서 검색된 영상이 이미 저장된 영상이라면 저장 버튼이 보이지 않아야 한다.", () => {
    cy.intercept(
      "https://clever-aryabhata-ff1fc1.netlify.app/youtube/v3/search?*",
      {
        fixture: "search",
      }
    ).as("search");

    cy.get("#search-modal-button").click();
    cy.searchKeyword(searchKeyword);
    cy.get(".video-item__save-button").eq(0).should("be.not.visible");
  });
});
