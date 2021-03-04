export const $ = selector => document.querySelector(selector);

export const $$ = selector => document.querySelectorAll(selector);

export const escapeApostrophe = string =>
  JSON.stringify(string).replace(/'/gi, '&#039;');
