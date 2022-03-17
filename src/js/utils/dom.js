import { SNACK_BAR_SHOWING_TIME_IN_MS } from '../constants';

const $ = (selector, baseElement = document) => baseElement.querySelector(selector);
const $$ = (selector, baseElement = document) => baseElement.querySelectorAll(selector);

const showSnackBar = message => {
  const $snackBar = $('#snack-bar');
  $snackBar.classList.add('show');
  $snackBar.textContent = message;

  setTimeout(() => {
    $snackBar.classList.remove('show');
  }, SNACK_BAR_SHOWING_TIME_IN_MS);
};

export { $, $$, showSnackBar };
