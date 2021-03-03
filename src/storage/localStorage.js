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
  return JSON.parse(localStorage.getItem(key));
}

function isKey(key) {
  return typeof key === 'string' || typeof key === 'number';
}
