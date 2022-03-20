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

export const validateAddData = (data, videos) => {
  if (isDuplicate(data, videos)) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_VIDEO_ID);
  }

  if (videos.length >= STORAGE_MAX_COUNT) {
    throw new Error(ERROR_MESSAGE.USER_STORAGE_OVERFLOW);
  }
};

export const changeVideoChecked = (videos, changeData, boolean) => {
  const changeIndex = videos.findIndex(
    (data) => data.videoId === changeData.videoId
  );

  videos[changeIndex].checked = boolean;

  return videos;
};

export const removeVideoItem = (videos, removeData) => {
  const removeIndex = videos.findIndex(
    (data) => data.videoId === removeData.videoId
  );

  videos.splice(removeIndex, 1);

  return videos;
};
