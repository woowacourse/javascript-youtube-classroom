import { DOM_CONSTANTS, ERROR_MESSAGE } from "./constants.js";
import elements from "./elements.js";

export const $ = (selector) => {
  try {
    const selected = document.querySelectorAll(selector);

    if (selected.length === 0) {
      throw new Error(ERROR_MESSAGE.CONNOT_FIND_ELEMENT_ERROR);
    }

    return selected.length === 1 ? selected[0] : selected;
  } catch (e) {
    console.error(e);
  }
};

export const getFormElements = ($form, elementName) => {
  try {
    const $elements = $form.elements[elementName];

    if (!$elements) {
      throw new Error(ERROR_MESSAGE.CONNOT_FIND_ELEMENT_ERROR);
    }

    return $elements;
  } catch (e) {
    console.error(e);
  }
};

export const showElement = ($target) => {
  $target.classList.remove(DOM_CONSTANTS.CLASS_NAME.D_NONE_HARD);
};

export const hideElement = ($target) => {
  $target.classList.add(DOM_CONSTANTS.CLASS_NAME.D_NONE_HARD);
};

export const addBackgroundColor = ($target, color) => {
  $target.classList.add(color);
};

export const removeBackgroundColor = ($target, color) => {
  $target.classList.remove(color);
};

export const lockScroll = ($target) => {
  $target.classList.add(DOM_CONSTANTS.CLASS_NAME.OVERFLOW_HIDDEN);
};

export const unlockScroll = ($target) => {
  $target.classList.remove(DOM_CONSTANTS.CLASS_NAME.OVERFLOW_HIDDEN);
};

export const openModal = ($target) => {
  $target.classList.add(DOM_CONSTANTS.CLASS_NAME.OPEN);
  lockScroll(elements.$body);
};

export const closeModal = ($target) => {
  $target.classList.remove(DOM_CONSTANTS.CLASS_NAME.OPEN);
  unlockScroll(elements.$body);
};
