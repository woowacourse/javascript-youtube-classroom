import {
  MAX_SAVE_AMOUNT,
  ERROR_MESSAGES,
  UNWATCHED_LIST_KEY,
  WATCHED_LIST_KEY,
} from '../constants/constants';

const keys = {
  watched: WATCHED_LIST_KEY,
  unwatched: UNWATCHED_LIST_KEY,
};

export function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(keys[key])) || [];
}

export function saveToStorage(key, value) {
  const idArray = getFromStorage(key);
  const allIdArray = Object.keys(keys).reduce(
    (array, storageKey) => [...array, ...getFromStorage(storageKey)],
    []
  );
  if (allIdArray.length >= MAX_SAVE_AMOUNT) {
    throw new Error(ERROR_MESSAGES.EXCEED_MAX_SAVE_AMOUNT);
  }
  localStorage.setItem(keys[key], JSON.stringify([...new Set([...idArray, value])]));
}

export function removeFromStorage(key, value) {
  const idArray = getFromStorage(key);
  const index = idArray.indexOf(value);
  if (index >= 0) idArray.splice(index, 1);
  localStorage.setItem(keys[key], JSON.stringify(idArray));
}

export function moveInStorage({ from, to, value }) {
  removeFromStorage(from, value);
  saveToStorage(to, value);
}
