export const getLocalStorageItem = ({ key, defaultValue }) => {
  const storedData = localStorage.getItem(key);

  return storedData ? JSON.parse(storedData) : defaultValue;
};

export const setLocalStorageItem = ({ key, item }) => {
  localStorage.setItem(key, JSON.stringify(item));
};
