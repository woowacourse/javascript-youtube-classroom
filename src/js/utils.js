import { ERROR_MESSAGE, STORAGE_MAX_COUNT } from "./constants";

export const isDuplicate = (inputData, storeData) => {
  return storeData.some((store) => store.videoId === inputData.videoId);
};

export const parsedDate = (rawDate) => {
  const date = rawDate.split("T")[0];
  const standard = ["년", "월", "일"];

  return date
    .split("-")
    .map((item, index) => Number(item) + standard[index])
    .join(" ")
    .trim();
};

export const throttle = (callback, delayTime) => {
  let timerId;

  return () => {
    if (timerId) return;

    timerId = setTimeout(() => {
      timerId = null;
      callback();
    }, delayTime);
  };
};

export const isEmptyString = (inputValue) => {
  return !inputValue.trim().length;
};

export const validateInput = (inputValue) => {
  if (isEmptyString(inputValue)) {
    throw new Error(ERROR_MESSAGE.SEARCH_INPUT_IS_EMPTY);
  }
};

export const validateAddData = (data, storage) => {
  if (isDuplicate(data, storage)) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_VIDEO_ID);
  }

  if (storage.length >= STORAGE_MAX_COUNT) {
    throw new Error(ERROR_MESSAGE.USER_STORAGE_OVERFLOW);
  }
};

export const changeStorageChecked = (storage, changeData, boolean) => {
  const changeIndex = storage.findIndex(
    (data) => data.videoId === changeData.videoId
  );

  storage[changeIndex].checked = boolean;

  return storage;
};

export const removeStorageItem = (storage, removeData) => {
  const removeIndex = storage.findIndex(
    (data) => data.videoId === removeData.videoId
  );

  storage.splice(removeIndex, 1);

  return storage;
};
