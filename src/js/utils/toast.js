import { $ } from './dom';

const $toast = $('.toast');
const toastNotification = (state, message) => {
  let hideTimeout = null;
  $toast.textContent = message;
  $toast.classList.add(`toast--${state}`);

  clearTimeout(hideTimeout);

  hideTimeout = setTimeout(() => {
    $toast.classList.remove(`toast--${state}`);
    $toast.textContent = '';
  }, 2000);
};

export default toastNotification;
