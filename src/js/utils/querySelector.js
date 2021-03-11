const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

const $c = (classname) => $(`.${classname}`);

const $$c = (classname) => $$(`.${classname}`);

export { $, $$, $c, $$c };
