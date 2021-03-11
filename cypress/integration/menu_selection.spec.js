/// <reference types="cypress" />

import { CLASS_NAME } from "../../src/js/utils/constants.js";

context("메뉴 선택", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500");
  });

  it("초기화면에서 비디오 검색 버튼을 누르면 검색 모달창이 띄워진다.", () => {
    cy.get(`.${CLASS_NAME.SEARCH_MODAL}`).should("not.have.class", "open");
    cy.get(`.${CLASS_NAME.VIDEO_SEARCH_BTN}`).click();
    cy.get(`.${CLASS_NAME.SEARCH_MODAL}`).should("have.class", "open");
  });
});
