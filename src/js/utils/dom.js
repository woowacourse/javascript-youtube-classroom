export const $ = selector => document.querySelector(selector);
export const $$ = selector => document.querySelectorAll(selector);

export const popMessage = ($target, message) => {
  $target.innerText = message;
  $target.classList.toggle("show");
  setTimeout(() => {
    $target.classList.toggle("show");
  }, 3000);
};
