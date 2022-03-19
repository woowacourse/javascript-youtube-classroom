import { ERROR_MESSAGE } from "../../src/js/constants/constants";

Cypress.Commands.add("openSearchModal", () => {
  cy.get("#search-modal-button").click();
});

Cypress.Commands.add("searchWithNoKeyword", () => {
  const alertStub = cy.stub();

  cy.on("window:alert", alertStub);
  cy.get("#search-input-keyword").clear().type(" ");
  cy.get("#search-button").click(() => {
    expect(alertStub).to.be.calledWith(ERROR_MESSAGE.SEARCH_INPUT_IS_EMPTY);
  });
});

Cypress.Commands.add("searchWithKeyword", (keyword) => {
  cy.get("#search-input-keyword").clear().type(keyword);
  cy.get("#search-button").click();
});

Cypress.Commands.add("clickSaveVideoButton", () => {
  cy.get(".video-item__save-button").eq(0).click();
});

Cypress.Commands.add("loadMoreVideos", () => {
  cy.get(".video-list").scrollTo("bottom");
});

Cypress.Commands.add("closeSearchModal", () => {
  cy.get(".dimmer").click({ force: true });
});

Cypress.Commands.add("clickWatchedVideoListTab", () => {
  cy.get("#watched-video-button").click();
});

Cypress.Commands.add("clickWatchLaterVideoListTab", () => {
  cy.get("#watch-later-video-button").click();
});

Cypress.Commands.add("clickVideoWatchButton", () => {
  cy.get(".video-item__watched-button").eq(0).click();
});

Cypress.Commands.add("clickVideoDeleteButton", (confirmButtonClick) => {
  cy.get(".video-item__delete-button").eq(0).click();

  cy.on("window:confirm", (text) => {
    console.log(text);
    expect(text).to.contains("정말로 삭제하시겠습니까?");
    return confirmButtonClick;
  });
});
