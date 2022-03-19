import { ERROR_MESSAGE } from './constants.js';

function isEmptyInput(searchInput) {
  return searchInput.trim() === '';
}

const validator = {
  validateSearchInput: searchInput => {
    if (isEmptyInput(searchInput)) {
      throw new Error(ERROR_MESSAGE.EMPTY_INPUT);
    }
  },
};

export default validator;
