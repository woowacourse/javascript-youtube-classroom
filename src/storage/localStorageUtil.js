// TODO : storage => storageModel 로 분리
export function setLocalStorageItem(key, item) {
  if (!isKey(key)) {
    return;
  }
  setLocalStorageItem(key, JSON.stringify(item));
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
