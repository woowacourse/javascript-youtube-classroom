import elements from "./elements.js";

export const showSnackbar = (message = "") => {
  const snackbar = document.createElement("div");
  snackbar.classList.add("snackbar");

  elements.$snackbarContainer.append(snackbar);
  snackbar.innerHTML = message;
  snackbar.classList.add("show-snackbar");

  setTimeout(() => {
    snackbar.classList.remove("show-snackbar");
  }, 2000);
};
