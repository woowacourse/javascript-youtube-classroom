import { ERROR } from './constants/constants.js';

export const validateInput = input => {
  if (!input) {
    throw new Error(ERROR.MESSAGE.EMPTY_INPUT);
  }
};
