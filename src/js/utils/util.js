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
  return JSON.parse(localStorage.getItem(key));
};
