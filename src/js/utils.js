import { SELECTORS } from './constants.js';

export const $ = (selector) => document.querySelector(selector);
export const $all = (selector) => [...document.querySelectorAll(selector)];

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const showSnackbar = (message, second = 3) => {
  $(SELECTORS.ID.SNACKBAR).textContent = message;
  $(SELECTORS.ID.SNACKBAR).classList.add(SELECTORS.STATUS.SNACKBAR_SHOW);

  setTimeout(() => {
    $(SELECTORS.ID.SNACKBAR).classList.remove(SELECTORS.STATUS.SNACKBAR_SHOW);
  }, second * 1000);
};
