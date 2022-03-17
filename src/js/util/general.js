import { ERROR } from '../constants/constants.js';

export const isEndOfScroll = (element) =>
  element.scrollHeight - element.scrollTop === element.clientHeight;

export const validateInput = (input) => {
  if (!input) {
    throw new Error(ERROR.MESSAGE.EMPTY_INPUT);
  }
};

export const throttle = (callback, delayTime) => {
  let timer;
  return () => {
    if (timer) return;

    timer = setTimeout(() => {
      timer = null;
      callback();
    }, delayTime);
  };
};
