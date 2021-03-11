import elements from "./elements.js";

export const showSnackbar = (message = "") => {
  elements.$snackbar.innerText = message;
  elements.$snackbar.classList.add("show-snackbar");

  setTimeout(() => {
    elements.$snackbar.classList.remove("show-snackbar");
  }, 3000);
};
