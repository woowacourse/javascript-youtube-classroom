import { CLASS, ERROR_MESSAGE } from '../constants/constant.js';

export const $ = selector => document.querySelector(selector);

export const $$ = selector => document.querySelectorAll(selector);

export const parseDOMFromString = string => {
  const parser = new DOMParser();
  return parser.parseFromString(string, 'text/html').body.firstElementChild;
};

export const setJSONToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    alert(ERROR_MESSAGE.FAILED_SET_ITEM);
  }
};

export const getJSONFromLocalStorage = key => {
  try {
    const json = JSON.parse(localStorage.getItem(key));
    if (json === null) return [];

    return json;
  } catch (error) {
    alert(ERROR_MESSAGE.FAILED_GET_ITEM);
  }

  return [];
};

export const isScrollUnfinished = (
  { scrollHeight, offsetHeight, clientHeight },
  scrollTop
) => {
  return scrollTop < Math.max(scrollHeight, offsetHeight) - clientHeight;
};

export const convertDateFormat = publishedDate => {
  const date = new Date(publishedDate);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const toggleSelectorClass = (selector, className, force = null) => {
  if (force === null) {
    selector.classList.toggle(className);
    return;
  }
  selector.classList.toggle(className, force);
};

const removeArticleSkeleton = event => {
  const article = event.target.closest('article');
  article.classList.remove(CLASS.SKELETON);
};

export const handleVideoLoad = iframe => {
  iframe.addEventListener('load', event => removeArticleSkeleton(event));
};

export const handleVideosLoad = iframes => {
  iframes.forEach(iframe => handleVideoLoad(iframe));
};
