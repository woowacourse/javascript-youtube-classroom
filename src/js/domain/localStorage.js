import { ERROR_MESSAGE } from '../constant';

export const setLocalStorage = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  } catch {
    alert(ERROR_MESSAGE.WRONG_INPUT);
  }
};
