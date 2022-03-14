import { ERROR_MESSAGES, NUM } from "./contants";

export const hasDuplicatedId = (storage, id) => {
  return storage.includes(id);
};

export const isExceedStorage = (storage) => {
  return storage.length >= NUM.MAX_STORAGE_LENGTH;
};

export const verifySaveId = (storage, id) => {
  if (hasDuplicatedId(storage, id)) {
    throw new Error(ERROR_MESSAGES.DUPLICATE_DATA);
  }
  if (isExceedStorage(storage)) {
    throw new Error(ERROR_MESSAGES.FULL_STORAGE);
  }
};
