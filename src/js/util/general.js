import { MESSAGE } from '../constants/constants.js';

export const isEndOfScroll = (element) =>
  element.scrollHeight - element.scrollTop === element.clientHeight;

export const validateInput = (input) => {
  if (!input) {
    throw new Error(MESSAGE.ERROR.EMPTY_INPUT);
  }
};
