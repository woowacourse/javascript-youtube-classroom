import { STORAGE } from "../utils/constants.js";

export const setDataToLocalStorage = (key = STORAGE.VIDEO_IDS, value = []) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
};

export const getDataFromLocalStorage = (key = STORAGE.VIDEO_IDS, defaultValue = []) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
  } catch (err) {
    console.error(err);

    return defaultValue;
  }
};
