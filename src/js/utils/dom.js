import { STANDARD_NUMS } from "./constants.js";

export const $ = selector => document.querySelector(selector);
export const $$ = selector => document.querySelectorAll(selector);

export const showSnackbar = ($target, message) => {
  $target.innerText = message;
  $target.classList.toggle("show");
  setTimeout(() => {
    $target.classList.toggle("show");
  }, STANDARD_NUMS.SNACKBAR_DELAY);
};
