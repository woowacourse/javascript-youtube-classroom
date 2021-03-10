import $DOM from './DOM.js';

export const snackbar = (message) => {
  $DOM.SNACK_BAR.CONTINAER.innerText = message;
  $DOM.SNACK_BAR.CONTINAER.classList.toggle('show');
  setTimeout(() => {
    $DOM.SNACK_BAR.CONTINAER.classList.toggle('show');
  }, 3000);
};
