import { SELECTORS } from './constants.js';

export const $ = (selector) => document.querySelector(selector);
export const $all = (selector) => [...document.querySelectorAll(selector)];

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

let snackbarTimeout = null;
export const showSnackbar = (message, second = 3) => {
  if (snackbarTimeout) {
    clearTimeout(snackbarTimeout);
  }

  $(SELECTORS.ID.SNACKBAR).textContent = message;
  $(SELECTORS.ID.SNACKBAR).classList.add(SELECTORS.STATUS.SNACKBAR_SHOW);

  snackbarTimeout = setTimeout(() => {
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

export const openModal = (selector) => {
  document.body.classList.add('overflow-hidden');
  $(selector).classList.add(SELECTORS.STATUS.MODAL_OPEN);
};

export const closeModal = (selector) => {
  document.body.classList.remove('overflow-hidden');
  $(selector).classList.remove(SELECTORS.STATUS.MODAL_OPEN);
};

export const generateCSSClass = (condition, className) => {
  return condition ? className : '';
};

export const hideElement = (selector) => {
  $(selector).classList.add('d-none');
};

export const showElement = (selector) => {
  $(selector).classList.remove('d-none');
};

export const colorizeButton = (selector) => {
  $(selector).classList.add('bg-cyan-100');
};

export const uncolorizeButton = (selector) => {
  $(selector).classList.remove('bg-cyan-100');
};

export const getVideoSaveButton = (id) => {
  const { YOUTUBE_SEARCH_RESULT, CLIP, BTN_SAVE } = SELECTORS.CLASS;
  return $(`${YOUTUBE_SEARCH_RESULT} ${CLIP}[data-video-id="${id}"] ${BTN_SAVE}`);
};
