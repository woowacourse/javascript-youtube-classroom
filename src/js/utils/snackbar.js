import elements from "./elements.js";

const createSnackbarViewer = () => {
  const $snackbar = elements.$snackbar;
  let timer = null;

  return (message = "") => {
    $snackbar.innerText = message;

    if (timer === null) {
      $snackbar.classList.remove("hide-snackbar");
      $snackbar.classList.add("show-snackbar");
    } else {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      $snackbar.classList.remove("show-snackbar");
      $snackbar.classList.add("hide-snackbar");

      timer = null;
    }, 2000);
  };
};

const showSnackbar = createSnackbarViewer();

export default showSnackbar;
