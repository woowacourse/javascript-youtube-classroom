const $ = (selector, baseElement = document) =>
  baseElement.querySelector(selector);
const $$ = (selector, baseElement = document) =>
  baseElement.querySelectorAll(selector);

export { $, $$ };
