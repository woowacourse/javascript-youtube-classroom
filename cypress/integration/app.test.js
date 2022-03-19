import { ITEMS_PER_REQUEST } from "../../src/js/constants/constants";

describe("나만의 유튜브 강의실 전체 플로우 테스트", () => {
  before(() => {
    cy.visit("./index.html");
  });

  const searchKeyword = "xooos";

  it("처음 실행하면 저장된 영상이 없다는 안내 문구가 나타난다.", () => {
    cy.get(".no-result__description").should("be.visible");
  });

  it("초기 화면에서 검색 버튼을 누르면 보고싶은 영상 찾기 모달창이 나타난다.", () => {
    cy.openSearchModal();
    cy.get(".modal-container").should("be.visible");
  });

  it("보고싶은 영상 찾기 모달창 안에서 검색된 영상을 불러오는 동안 로딩 이미지를 보여준다.", () => {
    cy.get("#search-input-keyword").clear().type(searchKeyword);
    cy.get("#search-button").click();
    cy.get(".skeleton").should("be.visible");
  });

  it("보고싶은 영상 찾기 모달창 안에서 검색창에 검색어를 입력하지 않으면 에러 메시지를 보여준다.", () => {
    cy.searchWithNoKeyword();
  });

  it("보고싶은 영상 찾기 모달창 안에서 원하는 영상을 검색할 수 있다.", () => {
    cy.searchWithKeyword(searchKeyword);
    cy.get(".video-item").should("be.visible");
  });

  it("보고싶은 영상 찾기 모달창 안에서 검색된 영상의 저장 버튼을 누르면 저장 버튼은 보이지 않아야 한다.", () => {
    cy.clickSaveVideoButton();
    cy.get(".video-item__save-button").eq(0).should("be.not.visible");
  });

  it("보고싶은 영상 찾기 모달창 안에서 검색 결과 영역 스크롤 바를 끝까지 내리면 새로운 영상 10개를 추가로 사용자에게 보여준다.", () => {
    cy.loadMoreVideos();
    cy.get(".video-list")
      .children()
      .should("have.length", ITEMS_PER_REQUEST * 2);
  });

  it("보고싶은 영상 찾기 모달창 안에서 검색된 영상이 이미 저장된 영상이라면 저장 버튼이 보이지 않아야 한다.", () => {
    cy.searchWithKeyword(searchKeyword);
    cy.get(".video-item__save-button").eq(0).should("be.not.visible");
  });

  it("보고싶은 영상 찾기 모달창이 열린 상태에서 모달창 뒤의 음영 된 부분을 누르면 모달창이 사라진다.", () => {
    cy.closeSearchModal();
    cy.get(".modal-container").should("be.not.visible");
  });

  it("초기 화면에서 저장된 영상을 확인할 수 있어야 한다.", () => {
    cy.get(".video-item").should("be.visible");
  });

  it("볼 영상 섹션에서 저장된 영상의 ✅ 버튼을 눌러 본 영상 섹션으로 옮길 수 있어야 한다.", () => {
    cy.get(".video-item__watched-button").eq(0).click();
    cy.get(".video-item").should("be.not.visible");
  });

  it("초기 화면에서 본 영상 버튼을 눌러 본 영상 목록을 확인할 수 있어야 한다.", () => {
    cy.get("#watched-video-button").click();
    cy.get(".video-item").should("be.visible");
  });

  it("본 영상 섹션에서 저장된 영상의 ✅ 버튼을 눌러 볼 영상 섹션으로 옮길 수 있어야 한다.", () => {
    cy.get(".video-item__watched-button").eq(0).click();
    cy.get("#watch-later-video-button").click();
    cy.get(".video-item").should("be.visible");
  });

  it("초기 화면에서 저장된 영상의 🗑️ 버튼을 눌러 영상을 삭제할지 확인할 수 있어야 한다.", () => {
    cy.get(".video-item__delete-button").eq(0).click();

    cy.on("window:confirm", (text) => {
      console.log(text);
      expect(text).to.contains("정말로 삭제하시겠습니까?");
      return false;
    });

    cy.get(".video-item").should("be.visible");
  });

  it("영상을 삭제할지 확인하는 화면에서 확인을 눌러 삭제할 수 있어야 한다.", () => {
    cy.get(".video-item__delete-button").eq(0).click();

    cy.on("window:confirm", (text) => {
      console.log(text);
      expect(text).to.contains("정말로 삭제하시겠습니까?");
      return true;
    });

    cy.get(".video-item").should("be.not.visible");
  });
});
