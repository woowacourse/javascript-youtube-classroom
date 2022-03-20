import { MESSAGE } from '../constants/constants.js';

export const scrollToTop = (element) => {
  element.scrollTo(0, 0);
};

export const isEndOfScroll = (element) =>
  element.scrollHeight - element.scrollTop === element.clientHeight;

export const validateInput = (input) => {
  if (!input) {
    throw new Error(MESSAGE.ERROR.EMPTY_INPUT);
  }
};
