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
