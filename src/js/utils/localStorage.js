import { ERROR_MESSAGES } from "./contants.js";

export const saveLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  } catch {
    throw new Error(ERROR_MESSAGES.CANNOT_PARSE_JSON);
  }
};
