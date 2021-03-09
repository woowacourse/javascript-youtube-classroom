import { $ } from './querySelector.js';

export const snackbar = (message) => {
  const $snackbar = $('[data-js="snackbar"]');

  $snackbar.innerText = message;
  $snackbar.classList.toggle('show');
  setTimeout(() => {
    $snackbar.classList.toggle('show');
  }, 3000);
};
