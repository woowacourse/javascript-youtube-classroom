export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => scope.querySelectorAll(selector);
