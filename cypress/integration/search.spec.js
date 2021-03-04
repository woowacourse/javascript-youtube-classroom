import { CLASSNAME, MAX_KEYWORDS_COUNT } from "../../src/js/constants.js";

describe("유투브 검색 API를 이용하여 영상들을 검색할 수 있다.", () => {
  context("유저가 검색창에 검색어를 입력하고 클릭을 했을 때", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(`.${CLASSNAME.VIDEO_SEARCH_TAB}`).click();
    });

    it("검색 결과가 없는 경우, 검색 결과 없음 이미지가 나타난다.", () => {
      cy.get(`.${CLASSNAME.YOUTUBE_SEARCH_FORM_INPUT}`).type("./");
      cy.get(`.${CLASSNAME.YOUTUBE_SEARCH_FORM_BUTTON}`).click();
      cy.get(`.${CLASSNAME.MODAL_VIDEO_WRAPPER}`)
        .children()
        .should("have.length", 0);
      cy.get(`.${CLASSNAME.NOT_FOUND_IMAGE}`).should("be.visible");
    });

    it("검색 결과가 있는 경우, 검색 결과가 나타난다.", () => {
      cy.get(`.${CLASSNAME.YOUTUBE_SEARCH_FORM_INPUT}`).type("우아한테크코스");
      cy.get(`.${CLASSNAME.YOUTUBE_SEARCH_FORM_BUTTON}`).click();
      cy.get(`.${CLASSNAME.MODAL_VIDEO_WRAPPER}`)
        .children()
        .should("have.length.least", 1);
    });

    it("검색을 하지 않은 경우, 최근 검색 키워드는 나타나지 않는다.", () => {
      cy.get(`.${CLASSNAME.KEYWORD_HISTORY_SECTION}`)
        .children("a.chip")
        .should("have.length", 0);
    });

    it.only("검색을 한 경우, 최근 검색 키워드가 추가된다.", () => {
      const keywords = ["우아한테크코스", "주모", "동동"];

      keywords.forEach((keyword, i) => {
        cy.get(`.${CLASSNAME.YOUTUBE_SEARCH_FORM_INPUT}`).type(keyword);
        cy.get(`.${CLASSNAME.YOUTUBE_SEARCH_FORM_BUTTON}`).click();
        cy.get(`.${CLASSNAME.KEYWORD_HISTORY_SECTION}`)
          .children("a.chip")
          .should("have.length", i + 1)
          .last()
          .invoke("text")
          .then((text) => expect(text).to.be.equal(keyword));
      });

      const fourthKeyword = "배민";
      const updatedKeywords = [...keywords, fourthKeyword].slice(
        -MAX_KEYWORDS_COUNT
      );
      const DELAY = 3000;

      cy.get(`.${CLASSNAME.YOUTUBE_SEARCH_FORM_INPUT}`).type(fourthKeyword);
      cy.get(`.${CLASSNAME.YOUTUBE_SEARCH_FORM_BUTTON}`).click();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(DELAY);
      cy.get(`.${CLASSNAME.KEYWORD_HISTORY_SECTION}`)
        .children("a.chip")
        .should("have.length", MAX_KEYWORDS_COUNT)
        .each(($keyword, index) => {
          expect($keyword.text()).to.be.equal(updatedKeywords[index]);
        });
    });

    it("최근 검색 키워드를 다시 검색한 경우, 이전의 키워드가 삭제되고 최근 검색 키워드에 다시 추가된다", () => {
      // TODO
    });
  });
});
