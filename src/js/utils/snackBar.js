import { $ } from './dom';

const showExceptionSnackBar = message => {
  const $snackBar = $('#snack-bar');
  $snackBar.classList.add('show');
  $snackBar.textContent = message;

  setTimeout(() => {
    $snackBar.classList.remove('show');
  }, 2000);
};

export { showExceptionSnackBar };
