import { INFOMATION_MESSAGES } from "../../src/js/utils/contants.js";

describe("유튜브 강의실 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000/");
  });

  it("검색 버튼을 클릭하면 모달 검색창이 나타난다.", () => {
    cy.get(".header-nav__search").click();
    cy.get(".modal").should("not.have.class", "hide");
  });

  it("검색 모달창에서 결과가 없는 검색어를 입력하면 결과 없음 이미지가 나타난다.", () => {
    const keyword = "꺏땳";
    cy.searchKeyword(keyword);
    cy.get(".modal-result__empty-image").should("be.visible");
  });

  it("검색 모달창에서 결과가 있는 검색어를 입력하면 영상 리스트가 나타난다.", () => {
    const keyword = "우테코";
    cy.searchKeyword(keyword);
    cy.get(".video-item").should("be.visible");
  });

  it("검색 모달창에서 저장을 누르면 확인 토스트 메세지가 나타난다.", () => {
    const keyword = "우테코";
    cy.searchKeyword(keyword);
    cy.get(".video-item__save-button").eq(0).click();
    cy.get(".toast").should("have.text", INFOMATION_MESSAGES.SAVED);
  });

  it("모달 닫기 버튼을 클릭하면 검색 모달창이 닫힌다.", () => {
    cy.get(".header-nav__search").click();
    cy.get(".modal").should("not.have.class", "hide");
    cy.get(".search-modal__close-button").click();
    cy.get(".modal").should("have.class", "hide");
  });

  it("저장한 영상의 삭제 버튼을 누르면 확인메세지가 나타난다.", () => {
    const keyword = "우테코";
    cy.searchKeyword(keyword);
    cy.get(".video-item__save-button").eq(0).click();
    cy.get(".video-item__delete-button").eq(0).click({ force: true });
    cy.on("window:confirm", (text) => {
      expect(text).to.equal(INFOMATION_MESSAGES.ASK_DELETE);
    });
  });
});
