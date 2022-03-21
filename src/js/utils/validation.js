import { ERROR_MESSAGES, NUM } from "./contants.js";

export const verifyCanSave = (array, id) => {
  if (array.includes(id)) {
    throw new Error(ERROR_MESSAGES.DUPLICATE_DATA);
  }
  if (array.length >= NUM.MAX_STORAGE_LENGTH) {
    throw new Error(ERROR_MESSAGES.FULL_STORAGE);
  }
};
