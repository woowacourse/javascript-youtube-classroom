import { ERROR } from '../constants/constants.js';

export const $ = selector => document.querySelector(selector);

export const $$ = selector => document.querySelectorAll(selector);

export const isEndOfScroll = element =>
  element.scrollHeight - element.scrollTop === element.clientHeight;

export const validateInput = input => {
  if (input === '') {
    throw new Error(ERROR.MESSAGE.EMPTY_INPUT);
  }
};

export function throttle(fn, delay) {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, arguments);
      }, delay);
    }
  };
}
