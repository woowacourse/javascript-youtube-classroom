export const $ = selector => document.querySelector(selector);

export const $$ = selector => document.querySelectorAll(selector);

export const escapeApostrophe = string => {
  return JSON.stringify(string).replace(/'/gi, '&#039;');
};

export const parseDOMFromString = string => {
  const parser = new DOMParser();
  return parser.parseFromString(string, 'text/html').body.firstElementChild;
};

export const setJSONToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getJSONFromLocalStorage = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return {};
  }
};

export const isScrollUnfinished = (document, target) => {
  return (
    target.scrollTop <
    Math.max(document.scrollHeight, document.offsetHeight) -
      document.clientHeight
  );
};

export const convertDateFormat = publishedDate => {
  const date = new Date(publishedDate);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};
