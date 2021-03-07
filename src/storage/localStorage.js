import { SETTINGS } from '../constants';

export function setLocalStorageItem(key, item) {
  if (!isKey(key)) {
    return;
  }
  localStorage.setItem(key, JSON.stringify(item));
}

export function getLocalStorageItem(key) {
  if (!isKey(key)) {
    return;
  }
  return JSON.parse(localStorage.getItem(key)) || [];
}

function isKey(key) {
  return typeof key === 'string' || typeof key === 'number';
}

export function pushLocalStorageItem(key, item) {
  const searchQueries = getLocalStorageItem(key) || [];
  if (searchQueries.length === SETTINGS.MAX_SAVED_SEARCH_QUERY_COUNT) {
    searchQueries.shift();
  }
  searchQueries.push(item);
  setLocalStorageItem(key, searchQueries);
}
