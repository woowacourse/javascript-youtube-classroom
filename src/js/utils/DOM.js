import { CLASSNAME } from "../constants/index.js";

const addClass = ($element, className) => {
  $element.classList.add(className);
};

const removeClass = ($element, className) => {
  $element.classList.remove(className);
};

const toggleClass = ($element, className, force) => {
  $element.classList.toggle(className, force);
};

const containsClass = ($element, className) =>
  $element.classList.contains(className);

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

const clear = ($element) => {
  // eslint-disable-next-line no-param-reassign
  $element.innerHTML = "";
};

const customMethod = {
  addClass,
  removeClass,
  toggleClass,
  containsClass,
  show,
  hide,
  open,
  close,
  clear,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

Object.setPrototypeOf(customMethod, Function.prototype);
Object.setPrototypeOf($, customMethod);

export { $, $$ };
