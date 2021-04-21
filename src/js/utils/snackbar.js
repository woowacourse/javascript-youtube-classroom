import { CLASSNAME } from "../constants/index.js";
import { $ } from "./DOM.js";

const $snackbarContainer = $(`.${CLASSNAME.SNACKBAR_CONTAINER}`);

const showSnackbar = (message = "") => {
  const $snackbar = document.createElement("div");
  $snackbar.classList.add(CLASSNAME.SNACKBAR);
  $snackbar.addEventListener("animationend", ({ target }) => target.remove());
  $snackbar.innerText = message;

  $snackbarContainer.append($snackbar);
};

export default showSnackbar;
