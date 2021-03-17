import { $ } from './index.js';

export const snackbar = (() => {
  const $snackbar = $('.js-snackbar');
  let timer = null;

  return {
    show: message => {
      $snackbar.textContent = message;
      $snackbar.classList.add('show');

      timer = setTimeout(() => {
        timer = null;
        $snackbar.classList.remove('show');
      }, 3000);
    },
  };
})();
