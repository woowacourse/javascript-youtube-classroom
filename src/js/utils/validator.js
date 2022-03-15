import { ERROR_MESSAGE } from './constants.js';

const validator = {
  checkValidSearchInput: searchInput => {
    if (isEmptyInput(searchInput)) {
      throw new Error(ERROR_MESSAGE.EMPTY_INPUT);
    }
  },
};

function isEmptyInput(searchInput) {
  return searchInput.trim() === '';
}

export default validator;
