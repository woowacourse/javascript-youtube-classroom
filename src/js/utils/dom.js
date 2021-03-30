import { STANDARD_NUMS } from "./constants.js";

export const $ = selector => document.querySelector(selector);
export const $$ = selector => document.querySelectorAll(selector);

export const popMessage = (() => {
  let timerId = null;

  return ($target, message) => {
    $target.innerText = message;

    if (!timerId) {
      $target.classList.toggle("show");
      timerId = setTimeout(() => {
        timerId = null;
        $target.classList.toggle("show");
      }, STANDARD_NUMS.SNACKBAR_DELAY);
    }
  };
})();
