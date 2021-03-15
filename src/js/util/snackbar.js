import { $ } from './index.js';

const $snackbarContainer = $('.js-snackbar-container');

const snackbar = message => {
  return `
    <div class="js-snackbar snackbar">${message}</div>
  `;
};

let timer;

export const showSnackbar = message => {
  $snackbarContainer.innerHTML = snackbar(message);

  const $snackbar = $('.js-snackbar');

  $snackbar.classList.add('show');

  if (timer) {
    timer = clearTimeout(timer);
  }

  timer = setTimeout(() => {
    $snackbar.classList.remove('show');
  }, 3000);
};
