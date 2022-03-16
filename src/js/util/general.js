import { ERROR, SCROLL_OFFSET } from '../constants/constants.js';

export const $ = selector => document.querySelector(selector);

export const $$ = selector => document.querySelectorAll(selector);

export const isEndOfScroll = element =>
  element.scrollTop + element.clientHeight >= element.scrollHeight - SCROLL_OFFSET;

export const validateInput = input => {
  if (!input) {
    throw new Error(ERROR.MESSAGE.EMPTY_INPUT);
  }
};

export function throttle(callBack, delay) {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        callBack.apply(this, arguments);
      }, delay);
    }
  };
}
