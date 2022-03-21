export const $ = (selector, parentElement = document) => parentElement.querySelector(selector);

export const $$ = (selector, parentElement = document) => parentElement.querySelectorAll(selector);
