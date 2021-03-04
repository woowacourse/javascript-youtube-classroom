export const $ = selector => {
  return document.querySelector(selector);
};

export const $$ = selector => {
  return document.querySelectorAll(selector);
};

export const showElement = $element => {
  $element.classList.remove('d-none');
};

export const hideElement = $element => {
  $element.classList.add('d-none');
};
