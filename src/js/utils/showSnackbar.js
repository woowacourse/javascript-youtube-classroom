import $DOM from './DOM.js';
import { $ } from './querySelector.js';

const snackbar = (message) => {
  return `
    <div id="snackbar" data-js="snackbar-container__message">
      ${message}
    </div>
  `;
};

let id;
export const showSnackbar = (message) => {
  $DOM.SNACK_BAR.CONTAINER.innerHTML = snackbar(message);

  const $snackbarContainerMessage = $(
    '[data-js="snackbar-container__message"]',
  );

  $snackbarContainerMessage.classList.toggle('show');

  if (id) {
    clearTimeout(id);
  }

  id = setTimeout(() => {
    $snackbarContainerMessage.classList.toggle('show');
  }, 3000);
};
