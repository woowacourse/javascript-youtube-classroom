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

export const renderSkeletonUI = (selector, repeatCount) => {
  const skeletonUITemplate = `
    <div class="skeleton">
      <div class="image"></div>
      <p class="line"></p>
      <p class="line"></p>
    </div>
  `.repeat(repeatCount);

  $(selector).innerHTML = skeletonUITemplate;
};

export const clearElement = (selector) => {
  $(selector).innerHTML = '';
};

export const formatDate = (publishedAt) => {
  const date = publishedAt.split('T')[0];
  const [year, month, day] = date.split('-');
  return `${year}년 ${month}월 ${day}일`;
};

export const openModal = () => {
  $(SELECTORS.CLASS.MODAL).classList.add(SELECTORS.STATUS.MODAL_OPEN);
};

export const closeModal = () => {
  $(SELECTORS.CLASS.MODAL).classList.remove(SELECTORS.STATUS.MODAL_OPEN);
};

export const generateCSSClass = (condition, className) => {
  return condition ? className : '';
};
