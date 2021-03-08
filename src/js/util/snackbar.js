import { $ } from './index.js';

const $snackbar = $('.js-snackbar');

export const showSnackbar = message => {
  $snackbar.innerText = message;
  $snackbar.classList.toggle('show');

  setTimeout(() => {
    $snackbar.classList.toggle('show');
  }, 3000);
};
