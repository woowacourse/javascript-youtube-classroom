import { CLASSNAME, REDIRECT_SERVER_HOST } from "../../src/js/constants.js";

describe("볼 영상 화면을 테스트한다.", () => {
  beforeEach(() => {
    cy.visit("/");
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

  it("가장 처음에 저장된 영상이 없는 경우, 비어있다는 것을 사용자에게 알려준다,", () => {
    cy.get(`.${CLASSNAME.NO_SAVED_VIDEO_IMAGE}`).should("be.visible");
  });

  it("저장된 영상이 있는 경우, 비어있지 않다는 것을 사용자에게 알려준다,", () => {
    const keyword = "배민";

    cy.get(`.${CLASSNAME.VIDEO_SEARCH_TAB}`).click();
    cy.get(`.${CLASSNAME.YOUTUBE_SEARCH_FORM_INPUT}`).type(keyword);
    cy.get(`.${CLASSNAME.YOUTUBE_SEARCH_FORM_BUTTON}`).click();
    cy.wait("@searchFromKeyword");

    cy.get(`.${CLASSNAME.SAVE_VIDEO_BUTTON}`).first().click();
    cy.get(`.${CLASSNAME.NO_SAVED_VIDEO_IMAGE}`).should("not.be.visible");
  });
});
