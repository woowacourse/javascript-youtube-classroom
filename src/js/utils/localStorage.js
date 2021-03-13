export const getListFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

const setListToLocalStorage = (key, list) => {
  localStorage.setItem(key, list);
};

export const getListByKey = (key) => {
  try {
    return JSON.parse(getListFromLocalStorage(key)) || [];
  } catch (e) {
    return [];
  }
};

export const setListByKey = (key, list) => {
  setListToLocalStorage(key, JSON.stringify(list));
};

export const insertItemByKey = (key, item) => {
  const list = getListByKey(key);

  list.push(item);
  setListByKey(key, list);
};

export const insertItemAtFirstByKey = (key, item) => {
  const list = getListByKey(key);

  list.unshift(item);
  setListByKey(key, list);
};

export const deleteLastItemByKey = (key) => {
  const list = getListByKey(key);

  setListByKey(key, list.slice(0, list.length - 1));
};

export const deleteTargetItemByKey = ({ key, secondKey }, value) => {
  const list = getListByKey(key);
  const filteredList = secondKey
    ? list.filter((item) => item[secondKey] !== value)
    : list.filter((item) => item !== value);
  setListByKey(key, filteredList);
};
