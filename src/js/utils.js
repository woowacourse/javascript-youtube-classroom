export const $ = (selector) => document.querySelector(selector);
export const $all = (selector) => [...document.querySelectorAll(selector)];

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
