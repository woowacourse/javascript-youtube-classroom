export const setLocalStorage = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key)) ?? [];

export const setWatchedToStorage = (id) => {
  const item = getLocalStorage('watched').concat(id);
  localStorage.setItem('watched', JSON.stringify(item));
};

export const toggleWatchedToStorage = (id) => {
  const items = getLocalStorage('watched');
  if (items.includes(id)) {
    removeLocalStorage('watched', id);
    return;
  }
  if (!items.includes(id)) {
    setWatchedToStorage(id);
  }
};

export const removeLocalStorage = (key, target) => {
  localStorage.setItem(
    key,
    JSON.stringify(getLocalStorage(key).filter((item) => item !== target)),
  );
};
