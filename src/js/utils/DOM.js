import { CLASSNAME } from "../constants/index.js";

const addClass = ($element, className) => {
  $element.classList.add(className);
};

const removeClass = ($element, className) => {
  $element.classList.remove(className);
};

const show = ($element) => {
  removeClass($element, CLASSNAME.HIDDEN);
};

const hide = ($element) => {
  addClass($element, CLASSNAME.HIDDEN);
};

const open = ($element) => {
  addClass($element, CLASSNAME.OPEN);
};

const close = ($element) => {
  removeClass($element, CLASSNAME.OPEN);
};

const customMethod = {
  addClass,
  removeClass,
  show,
  hide,
  open,
  close,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

Object.setPrototypeOf(customMethod, Function.prototype);
Object.setPrototypeOf($, customMethod);

export { $, $$ };
