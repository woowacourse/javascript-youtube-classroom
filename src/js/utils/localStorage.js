import { VALUE } from './constants.js';

export function addToStorage(key, value) {
  const items = getStorageData(key);

  if (items.includes(value)) return items;

  items.push(value);
  localStorage.setItem(key, JSON.stringify(items));

  return items;
}

export function removeFromStorage(key, value) {
  const items = getStorageData(key);

  if (!items.includes(value)) return items;

  items.splice(items.indexOf(value), 1);
  localStorage.setItem(key, JSON.stringify(items));

  return items;
}

export function toggleStorageValue(key, value) {
  const items = getStorageData(key);

  if (items.includes(value)) {
    items.splice(items.indexOf(value), 1);
  } else {
    items.push(value);
  }

  localStorage.setItem(key, JSON.stringify(items));

  return items;
}

export function updateRecentChips(key, value) {
  const recentKeywords = getStorageData(key);

  if (recentKeywords.includes(value)) {
    recentKeywords.splice(recentKeywords.indexOf(value), 1);
  }

  if (recentKeywords.length >= VALUE.KEYWORD_COUNT) {
    recentKeywords.pop();
  }

  recentKeywords.unshift(value);
  localStorage.setItem(key, JSON.stringify(recentKeywords));

  return recentKeywords;
}

export function getStorageData(key, defaultValue = []) {
  try {
    const items = JSON.parse(localStorage.getItem(key));

    return items || defaultValue;
  } catch (e) {
    console.error(e);

    return defaultValue;
  }
}
