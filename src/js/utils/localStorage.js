export const getListFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const setListToLocalStorage = (key, list) => {
  localStorage.setItem(key, list);
};
