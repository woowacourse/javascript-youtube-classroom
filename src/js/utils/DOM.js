export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const isEndOfScroll = ($element) => $element.scrollHeight - $element.scrollTop === $element.clientHeight;

export const showSnackbar = ({ messenger, message, showtime }) => {
  messenger.innerText = message;
  messenger.classList.add('show');
  setTimeout(() => {
    messenger.classList.remove('show');
  }, showtime);
};
