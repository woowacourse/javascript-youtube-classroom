export const $ = (selector, node = document) => node.querySelector(selector);
export const $$ = (selector, node = document) => node.querySelectorAll(selector);

export const debounce = (callback, delay) => {
  let timerId;

  return (event) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
};

export const parseDate = (publishedDate) =>
  `${publishedDate.getFullYear()}년 ${publishedDate.getMonth()}월 ${publishedDate.getDate()}일`;
