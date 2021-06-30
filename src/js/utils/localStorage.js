export const setDataToLocalStorage = (key, value = []) => {

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
};

export const getDataFromLocalStorage = (key, defaultValue = []) => {

  try {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
  } catch (err) {
    console.error(err);

    return defaultValue;
  }
};
