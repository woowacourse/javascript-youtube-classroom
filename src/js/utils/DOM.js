export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const isEndOfScroll = ($element) => $element.scrollHeight - $element.scrollTop === $element.clientHeight;
