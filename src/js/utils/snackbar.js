import { VALUE } from './constants.js';

export default function popSnackbar(message) {
  const snackbar = document.createElement('div');
  snackbar.classList.add('snackbar');

  document.querySelector('#snackbar-container').append(snackbar);

  snackbar.innerText = message;
  snackbar.classList.add('show');

  setTimeout(() => {
    snackbar.remove();
  }, VALUE.SNACKBAR_TIME);
}
