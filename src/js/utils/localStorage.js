export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
};

export const getLocalStorage = (key, defaultValue) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
  } catch (err) {
    console.error(err);
  }
};
