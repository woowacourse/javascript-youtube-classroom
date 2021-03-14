import {
  CLASSNAME,
  MAX_KEYWORDS_COUNT,
  MAX_RESULTS_COUNT,
} from "../../src/js/constants.js";
import { REDIRECT_SERVER_HOST } from "../../src/js/utils/API.js";

describe("유투브 검색 API를 이용하여 영상들을 검색할 수 있다.", () => {
  context("유저가 검색창에 검색어를 입력하고 클릭을 했을 때", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(`.${CLASSNAME.SEARCH_TAB}`).click();
      cy.clearLocalStorage();

      cy.intercept({
        url: REDIRECT_SERVER_HOST,
        query: {
          pageToken: /^$/,
        },
      }).as("searchFromKeyword");

      cy.intercept({
        url: REDIRECT_SERVER_HOST,
        query: {
          pageToken: /.+/,
        },
      }).as("searchFromScroll");
    });

    it("검색 결과가 없는 경우, 검색 결과 없음 이미지가 나타난다.", () => {
      cy.get(`.${CLASSNAME.SEARCH_FORM_INPUT}`).type("aps9odfuiaso9dpfklasd");
      cy.get(`.${CLASSNAME.SEARCH_FORM_BUTTON}`).click();
      cy.wait("@searchFromKeyword");

      cy.get(`.${CLASSNAME.SEARCH_VIDEO_WRAPPER}`)
        .children()
        .should("have.length", 0);
      cy.get(`.${CLASSNAME.NOT_FOUND_IMAGE}`).should("be.visible");
    });

    it("검색 결과가 있는 경우, 검색 결과가 나타난다.", () => {
      cy.get(`.${CLASSNAME.SEARCH_FORM_INPUT}`).type("우아한테크코스");
      cy.get(`.${CLASSNAME.SEARCH_FORM_BUTTON}`).click();
      cy.wait("@searchFromKeyword");

      cy.get(`.${CLASSNAME.SEARCH_VIDEO_WRAPPER}`)
        .children()
        .should("have.length.least", 1);
    });

    it("검색을 하지 않은 경우, 최근 검색 키워드는 나타나지 않는다.", () => {
      cy.get(`.${CLASSNAME.KEYWORD_HISTORY_SECTION}`)
        .children("a.chip")
        .should("have.length", 0);
    });

    it("검색을 한 경우, 최근 검색 키워드가 추가된다.", () => {
      const keywords = ["우아한테크코스", "주모", "동동"];

      keywords.forEach((keyword, i) => {
        cy.get(`.${CLASSNAME.SEARCH_FORM_INPUT}`).type(keyword);
        cy.get(`.${CLASSNAME.SEARCH_FORM_BUTTON}`).click();
        cy.wait("@searchFromKeyword");

        cy.get(`.${CLASSNAME.KEYWORD_HISTORY_SECTION}`)
          .children("a.chip")
          .should("have.length", i + 1)
          .last()
          .invoke("text")
          .then((text) => {
            expect(text).to.be.equal(keyword);
          });
      });

      const fourthKeyword = "배민";
      const updatedKeywords = [...keywords, fourthKeyword].slice(
        -MAX_KEYWORDS_COUNT
      );

      cy.get(`.${CLASSNAME.SEARCH_FORM_INPUT}`).type(fourthKeyword);
      cy.get(`.${CLASSNAME.SEARCH_FORM_BUTTON}`).click();
      cy.wait("@searchFromKeyword");

      cy.get(`.${CLASSNAME.KEYWORD_HISTORY_SECTION}`)
        .children("a.chip")
        .should("have.length", MAX_KEYWORDS_COUNT)
        .each(($keyword, index) => {
          expect($keyword.text()).to.be.equal(updatedKeywords[index]);
        });
    });

    it("최근 검색 키워드를 다시 검색한 경우, 이전의 키워드가 삭제되고 최근 검색 키워드에 다시 추가된다", () => {
      const keywords = ["우아한테크코스", "주모", "동동"];

      keywords.forEach((keyword) => {
        cy.get(`.${CLASSNAME.SEARCH_FORM_INPUT}`).type(keyword);
        cy.get(`.${CLASSNAME.SEARCH_FORM_BUTTON}`).click();
        cy.wait("@searchFromKeyword");
      });

      const duplicatedKeyword = "주모";
      const updatedKeywords = ["우아한테크코스", "동동", "주모"];

      cy.get(`.${CLASSNAME.SEARCH_FORM_INPUT}`).type(duplicatedKeyword);
      cy.get(`.${CLASSNAME.SEARCH_FORM_BUTTON}`).click();
      cy.wait("@searchFromKeyword");

      cy.get(`.${CLASSNAME.KEYWORD_HISTORY_SECTION}`)
        .children("a.chip")
        .should("have.length", MAX_KEYWORDS_COUNT)
        .each(($keyword, index) => {
          expect($keyword.text()).to.be.equal(updatedKeywords[index]);
        });
    });

    it("최초 검색결과는 10개까지만 보여준다. 더 많은 데이터는 스크롤을 내릴 때 추가로 10개씩 불러온다", () => {
      const keyword = "주모";

      cy.get(`.${CLASSNAME.SEARCH_FORM_INPUT}`).type(keyword);
      cy.get(`.${CLASSNAME.SEARCH_FORM_BUTTON}`).click();
      cy.wait("@searchFromKeyword");

      cy.get(`.${CLASSNAME.SEARCH_VIDEO_WRAPPER}`)
        .children()
        .should("have.length", MAX_RESULTS_COUNT);

      cy.get(`.${CLASSNAME.SEARCH_VIDEO_WRAPPER}`)
        .children("article.clip:last-child")
        .scrollIntoView();
      cy.wait("@searchFromScroll");

      cy.get(`.${CLASSNAME.SEARCH_VIDEO_WRAPPER}`)
        .children()
        .should("have.length", MAX_RESULTS_COUNT * 2);
    });

    it("검색 직후 skeleton UI가 나타나고, 데이터 로드된 후 skeleton UI가 없어진다.", () => {
      cy.get(`.${CLASSNAME.SEARCH_FORM_INPUT}`).type("우테코");
      cy.get(`.${CLASSNAME.SEARCH_FORM_BUTTON}`).click();
      cy.get(".modal .skeleton").should("have.length", MAX_RESULTS_COUNT);
      cy.wait("@searchFromKeyword");

      cy.get(".modal .skeleton").should("have.length", 0);
    });

    it("검색어를 검색한 후 각 비디오의 저장버튼을 누르면, 저장된 영상 갯수가 1씩 증가한다", () => {
      const keyword = "돼지";

      cy.get(`.${CLASSNAME.SAVED_VIDEOS_COUNT}`).should("have.text", 0);
      cy.get(`.${CLASSNAME.SEARCH_FORM_INPUT}`).type(keyword);
      cy.get(`.${CLASSNAME.SEARCH_FORM_BUTTON}`).click();
      cy.wait("@searchFromKeyword");

      cy.get(`.${CLASSNAME.SAVE_VIDEO_BUTTON}`).each(($btn, index) => {
        cy.wrap($btn).click();
        cy.wrap($btn).should("not.be.visible");
        cy.get(`.${CLASSNAME.SAVED_VIDEOS_COUNT}`).should(
          "have.text",
          index + 1
        );
      });
    });
  });
});
