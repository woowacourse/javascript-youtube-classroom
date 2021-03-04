export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const isEndOfPage = ($element) => $element.scrollHeight - $element.scrollTop === $element.clientHeight;
