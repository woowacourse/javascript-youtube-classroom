export const $ = (selector, $target = document) => {
  return $target.querySelector(selector);
};

export const $$ = (selector, $target = document) => {
  return $target.querySelectorAll(selector);
};

export const showElement = $element => {
  $element.classList.remove('d-none');
};

export const hideElement = $element => {
  $element.classList.add('d-none');
};
