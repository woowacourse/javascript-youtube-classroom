import { LOCALSTORAGE_KEY_WATCHED } from '../constant';

export const setLocalStorage = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key)) ?? [];

export const setWatchedToStorage = (id) => {
  const item = getLocalStorage(LOCALSTORAGE_KEY_WATCHED).concat(id);
  localStorage.setItem(LOCALSTORAGE_KEY_WATCHED, JSON.stringify(item));
};

export const toggleWatchedToStorage = (id) => {
  const items = getLocalStorage(LOCALSTORAGE_KEY_WATCHED);
  if (items.includes(id)) {
    removeLocalStorage(LOCALSTORAGE_KEY_WATCHED, id);
    return;
  }
  if (!items.includes(id)) {
    setWatchedToStorage(id);
  }
};

export const removeLocalStorage = (key, target) => {
  localStorage.setItem(
    key,
    JSON.stringify(getLocalStorage(key).filter((item) => item !== target)),
  );
};
