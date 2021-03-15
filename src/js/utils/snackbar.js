import { CLASSNAME, SNACKBAR_SHOW_TIME_IN_MS } from "../constants.js";
import { $ } from "./DOM.js";

const $snackbar = $(`.${CLASSNAME.SNACKBAR}`);
const $modalSnackbar = $(`.${CLASSNAME.MODAL_SNACKBAR}`);

const showSnackbar = (message) => {
  $snackbar.innerText = message;

  $snackbar.classList.toggle(CLASSNAME.SHOW);
  setTimeout(() => {
    $snackbar.classList.toggle(CLASSNAME.SHOW);
  }, SNACKBAR_SHOW_TIME_IN_MS);
};

const showModalSnackbar = (message) => {
  $modalSnackbar.innerText = message;

  $modalSnackbar.classList.toggle(CLASSNAME.SHOW);
  setTimeout(() => {
    $modalSnackbar.classList.toggle(CLASSNAME.SHOW);
  }, SNACKBAR_SHOW_TIME_IN_MS);
};

export { showSnackbar, showModalSnackbar };
