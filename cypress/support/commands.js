// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import VideoStorage from "../../src/js/VideoStorage";

Cypress.Commands.add("searchKeyword", (searchKeyword) => {
  cy.get("#search-input-keyword").clear().type(searchKeyword);
  cy.get("#search-button").click();
});

Cypress.Commands.add("addVideo", (videoId, boolean) => {
  const videoStorage = new VideoStorage();
  videoStorage.addVideo({
    videoId,
    thumbnailUrl: "https:",
    title: "this is title",
    channelName: "kkojae's channel",
    publishDate: "2022년 3월 3일",
    checked: boolean,
  });
});
