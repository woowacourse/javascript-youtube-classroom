import { ERROR_MESSAGE } from "../constants/constants";
import { totalScrollHeight, currentScrollHeight } from "./dom";

export const isDuplicate = (inputData, storeData) => {
  return storeData.some((store) => store.id === inputData.id);
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

export const isEmpty = (inputValue) => {
  return !inputValue.trim().length;
};

export const checkKeywordValid = (inputValue) => {
  if (isEmpty(inputValue)) {
    throw new Error(ERROR_MESSAGE.SEARCH_INPUT_IS_EMPTY);
  }
};

export const isScrollToBottom = (element) => {
  return totalScrollHeight(element) > currentScrollHeight(element);
};
