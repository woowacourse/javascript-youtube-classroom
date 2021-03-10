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
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    localStorage.setItem(key, {});
  }
};

export const getJSONFromLocalStorage = key => {
  try {
    const json = JSON.parse(localStorage.getItem(key));
    if (json === null) return [];

    return json;
  } catch (error) {
    return {};
  }
};

export const isScrollUnfinished = (args, scrollTop) => {
  return (
    scrollTop <
    Math.max(args.scrollHeight, args.offsetHeight) - args.clientHeight
  );
};

export const convertDateFormat = publishedDate => {
  const date = new Date(publishedDate);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};
