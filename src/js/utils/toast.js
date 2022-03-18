import { $ } from './dom';

const toastNotification = (message, state) => {
  const $toast = $('.toast');
  let hideTimeout = null;
  $toast.textContent = message;
  $toast.classList.add(`toast--${state}`);

  clearTimeout(hideTimeout);

  hideTimeout = setTimeout(() => {
    $toast.classList.remove(`toast--${state}`);
    $toast.textContent = '';
  }, 3000);
};

export default toastNotification;
