import { STANDARD_NUMS } from "./constants.js";

export const $ = selector => document.querySelector(selector);
export const $$ = selector => document.querySelectorAll(selector);

export const popMessage = (() => {
  let timerId = null;

  return ($target, message) => {
    $target.innerText = message;
    $target.classList.add("show");

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      $target.classList.remove("show");
    }, STANDARD_NUMS.SNACKBAR_DELAY);
  };
})();
