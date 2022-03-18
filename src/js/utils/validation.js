import { ERROR_MESSAGES, NUM } from "./contants.js";

export const hasDuplicatedId = (array, id) => {
  return array.includes(id);
};

export const isExceedArrayLength = (array) => {
  return array.length >= NUM.MAX_STORAGE_LENGTH;
};

export const verifySaveId = (array, id) => {
  if (hasDuplicatedId(array, id)) {
    throw new Error(ERROR_MESSAGES.DUPLICATE_DATA);
  }
  if (isExceedArrayLength(array)) {
    throw new Error(ERROR_MESSAGES.FULL_STORAGE);
  }
};
