import elements from "./elements.js";

export const $ = (selector) => {
  const selected = document.querySelectorAll(selector);
  return selected.length === 1 ? selected[0] : selected;
};

export const showElement = ($target) => {
  $target.classList.remove("d-none-hard");
};

export const hideElement = ($target) => {
  $target.classList.add("d-none-hard");
};

export const lockScroll = ($target) => {
  $target.classList.add("overflow-hidden");
};

export const unlockScroll = ($target) => {
  $target.classList.remove("overflow-hidden");
};

export const openModal = ($target) => {
  $target.classList.add("open");
  lockScroll(elements.$body);
};

export const closeModal = ($target) => {
  $target.classList.remove("open");
  unlockScroll(elements.$body);
};
