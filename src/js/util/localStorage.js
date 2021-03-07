export const getLocalStorageItem = ({ key, defaultValue }) => {
  const storedData = localStorage.getItem(key);

  if (!storedData) {
    return defaultValue;
  }

  try {
    return JSON.parse(storedData);
  } catch {
    throw new Error('Stored data is not JSON format.');
  }
};

export const setLocalStorageItem = ({ key, item }) => {
  localStorage.setItem(key, JSON.stringify(item));
};
