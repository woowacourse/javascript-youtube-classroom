export const $ = (selector, node = document) => node.querySelector(selector);
export const $$ = (selector, node = document) => node.querySelectorAll(selector);

export const debounce = (callback, delay) => {
  let timerId;

  return (event) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
};
