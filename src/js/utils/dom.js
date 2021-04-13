import { STANDARD_NUMS } from "./constants.js";

export const $ = selector => document.querySelector(selector);
export const $$ = selector => document.querySelectorAll(selector);

export const showSnackbar = (() => {
  let timeout;

  return ($target, message) => {
    $target.innerText = message;
    $target.classList.add("show");

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      $target.classList.remove("show");
    }, STANDARD_NUMS.SNACKBAR_DELAY);
  };
})();
