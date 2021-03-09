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

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const setLocalStorageItem = ({ key, item }) => {
  const data = JSON.stringify(item, getCircularReplacer());

  if (data === undefined) {
    throw new Error("Item type doesn't match with JSON");
  }

  localStorage.setItem(key, data);
};
