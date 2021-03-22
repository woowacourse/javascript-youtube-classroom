import { $ } from './DOM.js';

const $snackbar = $('.snackbar');

export const showSnackbar = ({ message, showtime }) => {
  $snackbar.innerText = message;
  $snackbar.classList.add('show');
  setTimeout(() => {
    $snackbar.classList.remove('show');
  }, showtime);
};
