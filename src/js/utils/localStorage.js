export const saveLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  } catch (e) {
    console.error(e);
    return [];
  }
};
