/// <reference types="cypress" />

context.only("모달을 통한 비디오 검색", () => {
  describe("검색 결과가 있는 경우", () => {
    before(() => {
      cy.visit("http://127.0.0.1:5500");
    });

    it("모달창이 띄워진 상황에서, 검색 창에 검색어를 입력한 후 검색 버튼을 누르면, 검색 결과 모달에 로딩 애니메이션이 출력된다.", () => {
      cy.get(".menu-section__video-search-btn").click();
      cy.get(".search-modal__input").type("스낵랩");
      cy.get(".search-modal__btn").click();
      cy.get(".skeleton").should("be.visible");
    });

    it("데이터 로딩 중인 상태에서, 검색 결과가 존재할 경우 10개 이하의 검색 결과가 출력된다.", () => {
      cy.get(".skeleton").should("not.exist");
      cy.get(".search-modal__video-wrapper").find(".clip").its("length").should("be.lte", 10);
    });

    it("10개 이하의 검색 결과가 출력된 경우, 로딩 애니메이션이 사라진다.", () => {
      cy.get(".skeleton").should("not.exist");
    });

    it("비디오 저장 버튼을 누를 경우, 해당 비디오의 저장 버튼이 사라지고 저장된 동영상 개수에 반영된다.", () => {
      cy.get(".clip__save-btn").not(".hidden").eq(0).click();
      cy.get(".clip__save-btn").eq(0).should("not.to.be.visible");
      cy.get(".search-modal__saved-video-count").should("have.text", `저장된 영상 갯수: 1개`);
    });
  });

  describe("검색 결과가 없는 경우", () => {
    before(() => {
      cy.visit("http://127.0.0.1:5500");
    });

    it("모달창이 띄워진 상황에서, 검색 창에 검색어를 입력한 후 검색 버튼을 눌렀을 때, 검색 결과가 없을 경우 검색 결과 모달에 검색 결과 없음 이미지가 출력된다.", () => {
      cy.get(".menu-section__video-search-btn").click();
      cy.get(".search-modal__input").type(
        "ㅏㅁㄴ이ㅏㅓ리마어리ㅏㅁ 넝리멎댤 ㅣ나어리ㅏ넝림 ㅣㅏㄴ얼",
      );
      cy.get(".search-modal__btn").click();
      cy.get(".no-result-image").should("to.be.exist");
    });
  });

  describe("스크롤을 끝까지 내리는 경우", () => {
    beforeEach(() => {
      cy.visit("http://127.0.0.1:5500");
    });

    // TODO: 테스트 코드 수정 필요
    it("10개 이상의 검색 결과가 있는 상태에서 스크롤을 끝까지 내릴 경우, 그 다음 검색 결과가 누적되어 20개 이하의 결과가 출력된다.", () => {
      cy.get(".menu-section__video-search-btn").click();
      cy.get(".search-modal__input").type("스낵랩");
      cy.get(".search-modal__btn").click();
      cy.get(".search-modal__scroll-area").scrollTo("bottom", { ensureScrollable: false });
      cy.get(".search-modal__video-wrapper")
        .find(".clip")
        .its("length")
        .should("be.gte", 10)
        .and("be.lte", 20);
    });

    it("10개 이하의 검색 결과가 있는 상태에서 스크롤을 끝까지 내릴 경우, 검색 결과의 변화가 없어야한다.", () => {
      cy.get(".menu-section__video-search-btn").click();
      cy.get(".search-modal__input").type("ㄻㄴㅇㄹㄴㅇㄹㄴㅇㅁㄹㄴㅁㅇㄹㄴㅇㅁㄻㄹ");
      cy.get(".search-modal__btn").click();
      cy.get(".search-modal__video-wrapper")
        .find(".clip")
        .its("length")
        .then(size => {
          cy.get(".search-modal__video-wrapper").scrollTo("bottom", { ensureScrollable: false });
          cy.get(".search-modal__video-wrapper").find(".clip").its("length").should("to.be", size);
        });
    });
  });

  describe("최근 검색어 관리", () => {
    beforeEach(() => {
      cy.visit("http://127.0.0.1:5500");
    });

    it("검색 창에 검색어를 입력한 후 검색 버튼을 눌렀을 때, 최근 검색어가 추가된다.", () => {
      cy.get(".menu-section__video-search-btn").click();
      cy.get(".search-modal__input").type("스낵랩");
      cy.get(".search-modal__btn").click();
      cy.get(".keyword-history__keyword").eq(0).should("have.text", "스낵랩");
    });

    it("검색을 3번 이상 수행했을 때, 최근 검색어는 3개까지 저장된다. 최근 검색어는 좌측에 추가되고, 3개 이상의 검색어가 존재할 경우 가장 오래된 검색어는 사라진다.", () => {
      cy.get(".menu-section__video-search-btn").click();
      cy.get(".search-modal__input").type("맥도날드");
      cy.get(".search-modal__btn").click();

      cy.get(".search-modal__input").clear();
      cy.get(".search-modal__input").type("버거킹");
      cy.get(".search-modal__btn").click();

      cy.get(".search-modal__input").clear();
      cy.get(".search-modal__input").type("롯데리아");
      cy.get(".search-modal__btn").click();

      cy.get(".search-modal__input").clear();
      cy.get(".search-modal__input").type("맘스터치");
      cy.get(".search-modal__btn").click();

      cy.get(".keyword-history__keyword").should("have.length", 3);
      cy.get(".keyword-history__keyword").eq(0).should("have.text", "맘스터치");
      cy.get(".keyword-history__keyword").eq(1).should("have.text", "롯데리아");
      cy.get(".keyword-history__keyword").eq(2).should("have.text", "버거킹");
    });

    it.only("검색을 수행한 이후 검색 창을 닫고 다시 열 경우, 가장 최근의 검색 결과를 보여준다.", () => {
      cy.get(".menu-section__video-search-btn").click();
      cy.get(".search-modal__input").type("스낵랩");
      cy.get(".search-modal__btn").click();

      cy.get(".search-modal__video-wrapper")
        .find(".clip")
        .then($clip => {
          const firstClipSrc = $clip.eq(0).find("iframe").attr("src");
          const lastClipSrc = $clip.eq(-1).find("iframe").attr("src");

          cy.get(".modal-close").click();
          cy.get(".menu-section__video-search-btn").click();
          cy.get(".search-modal__video-wrapper")
            .find(".clip")
            .then($clip_ => {
              expect($clip_.eq(0).find("iframe").attr("src")).to.equal(firstClipSrc);
              expect($clip_.eq(-1).find("iframe").attr("src")).to.equal(lastClipSrc);
            });
        });
    });
  });
});
