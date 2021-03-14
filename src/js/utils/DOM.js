const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const parseHTML = html => {
  const parser = new DOMParser();

  return parser.parseFromString(html, 'text/html').body.firstElementChild;
};

export { $, $$, parseHTML };
