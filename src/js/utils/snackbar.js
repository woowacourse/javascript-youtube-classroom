const snackbarTemplate = (message) => `<div class="snackbar">${message}</div>`;

export const showSnackbar = (() => {
  let timeout;
  return ({ $target, message, showtime }) => {
    $target.innerHTML = snackbarTemplate(message);

    const $snackbar = document.querySelector('.snackbar');
    $snackbar.classList.add('show');

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      $snackbar.classList.remove('show');
    }, showtime);
  };
})();
