export const getListFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

const setListToLocalStorage = (key, list) => {
  localStorage.setItem(key, list);
};

export const getListFromDB = (key) => {
  try {
    return JSON.parse(getListFromLocalStorage(key)) || [];
  } catch (e) {
    return [];
  }
};

export const setListToDB = (key, list) => {
  setListToLocalStorage(key, JSON.stringify(list));
};

export const insertItemByKey = (key, item) => {
  const list = getListFromDB(key);

  list.push(item);
  setListToDB(key, list);
};

export const insertItemAtFirstByKey = (key, item) => {
  const list = getListFromDB(key);

  list.unshift(item);
  setListToDB(key, list);
};

export const deleteLastItemByKey = (key) => {
  const list = getListFromDB(key);

  setListToDB(key, list.slice(0, list.length - 1));
};

export const deleteTargetItemByKey = ({ key, secondKey }, value) => {
  const list = getListFromDB(key);
  const filteredList = secondKey
    ? list.filter((item) => item[secondKey] !== value)
    : list.filter((item) => item !== value);
  setListToDB(key, filteredList);
};
