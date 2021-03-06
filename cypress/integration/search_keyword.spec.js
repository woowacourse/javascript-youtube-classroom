/// <reference types="cypress" />

import { ALERT_MESSAGE, STANDARD_NUMS } from "../../src/js/utils/constants";

context("모달을 통한 비디오 검색", () => {
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
      cy.get(".search-modal__video-wrapper")
        .find(".clip")
        .its("length")
        .should("be.lte", STANDARD_NUMS.LOAD_CLIP_COUNT);
    });

    it("10개 이하의 검색 결과가 출력된 경우, 로딩 애니메이션이 사라진다.", () => {
      cy.get(".skeleton").should("not.exist");
    });
  });

  describe("비디오를 저장하는 경우", () => {
    beforeEach(() => {
      cy.visit("http://127.0.0.1:5500");
    });

    it("비디오 저장 버튼을 누를 경우, 해당 비디오의 저장 버튼이 사라지고 저장된 동영상 개수에 반영된다.", () => {
      cy.get(".menu-section__video-search-btn").click();
      cy.get(".search-modal__input").type("스낵랩");
      cy.get(".search-modal__btn").click();
      cy.get(".clip__save-btn").not(".hidden").eq(0).click();
      cy.get(".clip__save-btn").eq(0).should("not.to.be.visible");
      cy.get(".search-modal__saved-video-count").should(
        "have.text",
        `저장된 영상 갯수: 1/${STANDARD_NUMS.MAX_SAVE_VIDEO_COUNT}개`,
      );
    });

    it("최대 저장 개수를 초과하여 저장을 시도할 경우, alert 메시지를 출력한다.", () => {
      // api 요청 제한 이슈로 테스트 시에는 최대 저장 가능 개수를 1개로 설정하였습니다.
      const alertStub = cy.stub();

      cy.get(".menu-section__video-search-btn").click();
      cy.get(".search-modal__input").type("스낵랩");
      cy.get(".search-modal__btn").click();
      cy.get(".clip__save-btn").not(".hidden").eq(0).click();
      cy.get(".clip__save-btn").not(".hidden").eq(1).click();

      cy.on("window:alert", alertStub).then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.OVER_MAX_SAVE_VIDEO_COUNT);
      });
    });
  });

  describe("검색 결과가 없는 경우", () => {
    before(() => {
      cy.visit("http://127.0.0.1:5500");
    });

    it("모달창이 띄워진 상황에서, 검색 창에 검색어를 입력한 후 검색 버튼을 눌렀을 때, 검색 결과가 없을 경우 검색 결과 모달에 검색 결과 없음 이미지가 출력된다.", () => {
      const NO_RESULT_KEYWORD = "ㅏㅁㄴ이ㅏㅓ리마어리ㅏㅁ 넝리멎댤 ㅣ나어리ㅏ넝림 ㅣㅏㄴ얼";

      cy.get(".menu-section__video-search-btn").click();
      cy.get(".search-modal__input").type(NO_RESULT_KEYWORD);
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
        .should("be.gte", STANDARD_NUMS.LOAD_CLIP_COUNT)
        .and("be.lte", STANDARD_NUMS.LOAD_CLIP_COUNT * 2); // 1번 추가로 불러올 경우 최대 20개 까지 검색됨
    });

    it("10개 이하의 검색 결과가 있는 상태에서 스크롤을 끝까지 내릴 경우, 검색 결과의 변화가 없어야한다.", () => {
      const UNDER_TEN_RESULT_KEYWORD = "ㄻㄴㅇㄹㄴㅇㄹㄴㅇㅁㄹㄴㅁㅇㄹㄴㅇㅁㄻㄹ";

      cy.get(".menu-section__video-search-btn").click();
      cy.get(".search-modal__input").type(UNDER_TEN_RESULT_KEYWORD);
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

  describe.only("최근 검색어 관리", () => {
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

      cy.get(".keyword-history__keyword").should(
        "have.length",
        STANDARD_NUMS.MAX_SAVE_KEYWORD_COUNT,
      );

      cy.wait(3000); // 데이터 fetch 이후 DOM에 반영되기 전에 다음 검증 과정을 막기 위함
      cy.get(".keyword-history__keyword").eq(0).should("have.text", "맘스터치");
      cy.get(".keyword-history__keyword").eq(1).should("have.text", "롯데리아");
      cy.get(".keyword-history__keyword").eq(2).should("have.text", "버거킹");
    });

    it("검색을 수행한 이후 검색 창을 닫고 다시 열 경우, 가장 최근의 검색 결과를 보여준다.", () => {
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
