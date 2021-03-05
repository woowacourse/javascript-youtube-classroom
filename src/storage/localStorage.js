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

export function pushLocalStorageItem(key, item) {
  const searchQueries = getLocalStorageItem(key) || [];
  //TODO : 3개 검색어가 이미 존재하면 하나 삭제하고 넣기 구현
  searchQueries.push(item);
  setLocalStorageItem(key, searchQueries);
}
