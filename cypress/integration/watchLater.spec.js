import { CLASSNAME, REGULAR_EXPRESSION } from "../../src/js/constants/index.js";
import { REDIRECT_SERVER_HOST } from "../../src/js/utils/API.js";

describe("볼 영상 화면을 테스트한다.", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();

    cy.intercept({
      url: REDIRECT_SERVER_HOST,
      query: {
        pageToken: REGULAR_EXPRESSION.EMPTY_STRING,
      },
    }).as("searchFromKeyword");

    cy.intercept({
      url: REDIRECT_SERVER_HOST,
      query: {
        pageToken: REGULAR_EXPRESSION.NOT_EMPTY_STRING,
      },
    }).as("searchFromScroll");

    cy.window().then((window) => {
      cy.stub(window, "confirm").returns(true).as("window:confirm");
    });
  });

  const search = (keyword) => {
    cy.get(`.${CLASSNAME.SEARCH_TAB}`).click();
    cy.get(`.${CLASSNAME.SEARCH_FORM_INPUT}`).type(keyword);
    cy.get(`.${CLASSNAME.SEARCH_FORM_BUTTON}`).click();
    cy.wait("@searchFromKeyword");
  };

  it("가장 처음에 저장된 영상이 없는 경우, 비어있다는 것을 사용자에게 알려준다,", () => {
    cy.get(`.${CLASSNAME.NO_WATCHING_VIDEO_IMAGE}`).should("be.visible");
  });

  it("저장된 영상이 있는 경우, 비어있지 않다는 것을 사용자에게 알려준다,", () => {
    const keyword = "배민";

    cy.get(`.${CLASSNAME.SEARCH_TAB}`).click();
    cy.get(`.${CLASSNAME.SEARCH_FORM_INPUT}`).type(keyword);
    cy.get(`.${CLASSNAME.SEARCH_FORM_BUTTON}`).click();
    cy.wait("@searchFromKeyword");

    cy.get(`.${CLASSNAME.SAVE_VIDEO_BUTTON}`).first().click();
    cy.get(`.${CLASSNAME.NO_WATCHING_VIDEO_IMAGE}`).should("not.be.visible");
  });

  it("검색된 영상을 저장하면, 해당 영상이 볼 영상 화면에 표시된다.", () => {
    const keyword = "주주주";
    search(keyword);

    let savedVideoId;

    cy.get(`.${CLASSNAME.SAVE_VIDEO_BUTTON}`)
      .first()
      .click()
      .invoke("attr", "data-video-id")
      .then((videoId) => {
        savedVideoId = videoId;
      });

    cy.get(`.${CLASSNAME.MODAL_CLOSE}`).click();
    cy.get(`.${CLASSNAME.NO_WATCHING_VIDEO_IMAGE}`).should("not.be.visible");
    cy.get(`.${CLASSNAME.WATCH_LATER_VIDEO_WRAPPER}`)
      .find("iframe")
      .invoke("attr", "src")
      .then((src) => {
        expect(src).to.match(new RegExp(`${savedVideoId}$`));
      });
  });

  it("🗑️ 버튼을 누르면, 해당 영상이 볼 영상 리스트에서 삭제되고, 👁️ 볼 영상 화면에서 나타나지 않는다.", () => {
    const keyword = "주토피아";
    search(keyword);

    cy.get(`.${CLASSNAME.SAVE_VIDEO_BUTTON}`).first().click();
    cy.get(`.${CLASSNAME.MODAL_CLOSE}`).click();
    cy.get(`.${CLASSNAME.WATCH_LATER_VIDEO_WRAPPER}`)
      .children()
      .should("have.length", 1);

    cy.get(`.${CLASSNAME.DELETE_ICON}`).first().click();
    cy.get("@window:confirm").should("be.called");

    cy.get(`.${CLASSNAME.WATCH_LATER_VIDEO_WRAPPER}`)
      .children()
      .should("have.length", 0);
  });

  it("✅ 버튼을 누르면, 해당 영상이 볼 영상 리스트에서 삭제되고, ✅ 본 영상 화면에 나타난다", () => {
    const keyword = "티셔츠";
    search(keyword);

    cy.get(`.${CLASSNAME.SAVE_VIDEO_BUTTON}`).first().click();
    cy.get(`.${CLASSNAME.MODAL_CLOSE}`).click();

    cy.get(`.${CLASSNAME.MOVE_TO_HISTORY_ICON}`).first().click();
    cy.get(`.${CLASSNAME.WATCH_LATER_VIDEO_WRAPPER}`)
      .children()
      .should("have.length", 0);
    cy.get(`.${CLASSNAME.NO_WATCHING_VIDEO_IMAGE}`).should("be.visible");

    cy.get(`.${CLASSNAME.HISTORY_TAB}`).click();
    cy.get(`.${CLASSNAME.HISTORY_VIDEO_WRAPPER}`)
      .children()
      .should("have.length", 1);
  });
});
