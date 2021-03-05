export const $ = (selector, target = document) => {
  return target.querySelector(selector);
};

export const $$ = (selector, target = document) => {
  return target.querySelectorAll(selector);
};

export const createElement = ({ tag = 'div', classes = [], textContent }) => {
  const element = document.createElement(tag);
  element.classList.add(...classes);
  element.textContent = textContent ?? '';
  return element;
};

export const isEmptyString = (string) => {
  return string.trim() === '';
};
