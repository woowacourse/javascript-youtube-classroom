export const $ = (selector, node = document) => node.querySelector(selector);
export const $$ = (selector, node = document) => node.querySelectorAll(selector);

export const debounce = (callback, delay) => {
  let timerId;

  return (event) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
};

export const hideElement = (element) => {
  element.classList.add('hide');
};

export const showElement = (element) => {
  element.classList.remove('hide');
};

export const showSnackbar = (message) => {
  $('#snackbar').classList.add('show');
  $('#snackbar').innerText = message;
  setTimeout(() => {
    $('#snackbar').classList.remove('show');
  }, 3000);
};
