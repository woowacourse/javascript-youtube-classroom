import {
  CLASSNAME,
  MAX_KEYWORDS_COUNT,
  MAX_RESULTS_COUNT,
  REDIRECT_SERVER_HOST,
} from "../../src/js/constants.js";

describe("볼 영상 화면을 테스트한다.", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
  });

  it("가장 처음에 저장된 영상이 없는 경우, 비어있다는 것을 사용자에게 알려준다,", () => {
    cy.get(`.${CLASSNAME.NO_SAVED_VIDEO_IMAGE}`).should("be.visible");
  });
});
