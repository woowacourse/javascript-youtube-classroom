import { $ } from './dom';

const $toast = $('.toast');
const toastNotification = (state, message) => {
  $toast.textContent = message;
  $toast.classList.add(`toast--${state}`);

  setTimeout(() => {
    $toast.classList.remove(`toast--${state}`);
    $toast.textContent = '';
  }, 3000);
};

export default toastNotification;
